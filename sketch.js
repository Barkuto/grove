let canvas;
let rows, cols;
let size;
let grid;

let currentTile, currentType, currentTier;
let wildB, vividB, primalB;
let t1, t2, t3, t4;
let seedB, collectorB, tankB, disperserB, pylonB, wireB;
let resetB;
let currentSelection, info;
let borderR;

let elements = [];
let showBorders = true;

let gridString = [
  "1111000000111111111100000000000000000000",
  "1111000000111111111100000000000000000000",
  "1111000000001111110000000000000000000000",
  "1111000000001111110000000000000000000000",
  "1111000000000001110000000000000000000000",
  "1111000000000000010000000000000000000000",
  "1111000000000000110000000000000000000000",
  "1111000000000000SS0000000000000000000000",
  "1111000000000000SS0000000000000000000000",
  "1111000000000000SS0000000000000000000000",
  "1111001111S111001111111SSSSS000000000000",
  "1111001111S111000000111SSSSS000000000000",
  "11110011110000000000000000SS000000111111",
  "1111001111000000000000000011000000111111",
  "1111001111000000000000000011100000111111",
  "1111001111000000000000000011100000111111",
  "111100000000000001111000000111SSSS111111",
  "111100000111100111111100000000SSSS011111",
  "11110000011WW10CC11111000000000000001111",
  "11110000011WW100111111000000000000001111",
  "11110000011SS100011111000000000000001111",
  "1111000000000000001110000000000000001111",
  "1111000000000000000000000000000000001111",
  "1111000000000000000000000000000000001111",
  "1111000000000000000000000000000000111111",
  "1111000000000000000000000000000000111111",
  "110011111S110000000000000000000000111111",
  "110011111S110000000000000000000000111111",
  "0000000000110000001SSS111111SSS111111111",
  "0000000000110000001SSS001100SSS111111111",
  "0000000000110000001000000000000000111111",
  "0000000000110000001000000000000000111111",
  "0000000000SS0000001000000000000000111111",
  "0000000000110000001000000000000000111111",
  "1111000000110000001000000000000000111111",
  "1111000000110000001000000000000000111111",
  "111100000011000000SS00001111111111111111",
  "1111000000SS000000SS00001111111111111111",
  "1111111111111111111100111111111111111111",
  "1111111111111111111100111111111111111111"]

function setup() {
  rows = 40;
  cols = 40;
  size = 22;
  let h = size * rows;
  currentTile = SEED;
  currentType = WILD;
  currentTier = 1;
  canvas = createCanvas(h, h);

  wildB = createButton("WILD").mousePressed(() => { currentType = WILD });
  vividB = createButton("VIVID").mousePressed(() => { currentType = VIVID });
  primalB = createButton("PRIMAL").mousePressed(() => { currentType = PRIMAL });

  seedB = createButton("SEED").mousePressed(() => { currentTile = SEED });
  collectorB = createButton("COLLECTOR").mousePressed(() => { currentTile = COLLECTOR });
  tankB = createButton("TANK").mousePressed(() => { currentTile = TANK });
  disperserB = createButton("DISPERSER").mousePressed(() => { currentTile = DISPERSER });
  pylonB = createButton("PYLON").mousePressed(() => { currentTile = PYLON });
  wireB = createButton("WIRE").mousePressed(() => { currentTile = WIRE });
  resetB = createButton("RESET").mousePressed(() => { elements = []; updateURL(); });

  t1 = createButton("1").mousePressed(() => { currentTier = 1 });
  t2 = createButton("2").mousePressed(() => { currentTier = 2 });
  t3 = createButton("3").mousePressed(() => { currentTier = 3 });
  t4 = createButton("4").mousePressed(() => { currentTier = 4 });

  borderR = createCheckbox('Show Borders', true);
  borderR.changed(() => { showBorders = !showBorders });

  currentSelection = createElement('h2', currentType + '<br>' + currentTile + '<br>' + currentTier);
  info = createElement('h3', 'Pylons can be connected<br>if within a 4 block square<br>radius of each other.');

  makeGrid();
  updateButtons();

  let params = getURLParams();
  if (params.length > 0)
    elements = stringToElements(params.e);

  frameRate(60);
}

// Redraws Background Grid
function makeGrid() {
  background(200);
  stroke(150);
  strokeWeight(1);
  for (let i = 0; i <= rows; i++) {
    line(0, i * size, width, i * size);
  }
  for (let i = 0; i <= cols; i++) {
    line(i * size, 0, i * size, height);
  }

  noStroke();
  grid = [];
  for (let i = 0; i < gridString.length; i++) {
    grid[i] = [];
    r = gridString[i].split('');
    for (let j = 0; j < r.length; j++) {
      grid[i][j] = r[j];
      if (r[j] != '0') {
        if (r[j] == '1') {
          fill(0);
        } else if (r[j] == 'W') {
          fill('blue');
        } else if (r[j] == 'C') {
          fill('brown');
        } else if (r[j] == 'S') {
          fill(70);
        }
        rect(j * size, i * size, size, size);
      }
    }
  }
}

// Main "Game" Loop, occurs 60 times a second
function draw() {
  updateButtons();

  makeGrid();

  borderR.position(canvas.position().x + width, size * 10);
  currentSelection.position(canvas.position().x + width, height / 4);
  info.position(canvas.position().x + width, height / 2.5);

  currentSelection.html(currentType + '<br>' + currentTile + '<br>' + currentTier);
  info.html('Pylons can be connected<br>if within a 4 block square<br>radius of each other.');

  elements.forEach(e => { e.show() });
  if (showBorders)
    drawBorders();

  let gridX = Math.floor(mouseX / size);
  let gridY = Math.floor(mouseY / size);

  if (checkPos(gridX, gridY)) {
    drawPreview(gridX, gridY, currentTile, currentType, currentTier);
  }
}

// Update position of buttons
// Used mainly for when window size changes
function updateButtons() {
  let canvasX = canvas.position().x;

  wildB.size(100, size);
  vividB.size(100, size);
  primalB.size(100, size);

  t1.size(size, size);
  t2.size(size, size);
  t3.size(size, size);
  t4.size(size, size);

  seedB.size(100, size);
  collectorB.size(100, size);
  tankB.size(100, size);
  disperserB.size(100, size);
  pylonB.size(100, size);
  wireB.size(100, size);
  resetB.size(100, size);

  wildB.position(canvasX + width, 0);
  vividB.position(canvasX + width, size);
  primalB.position(canvasX + width, size * 2);

  t1.position(canvasX + width + 100, 0);
  t2.position(canvasX + width + 100 + size, 0);
  t3.position(canvasX + width + 100, size);
  t4.position(canvasX + width + 100 + size, size);

  seedB.position(canvasX + width, size * 4);
  collectorB.position(canvasX + width, size * 5);
  tankB.position(canvasX + width, size * 6);
  disperserB.position(canvasX + width, size * 7);
  pylonB.position(canvasX + width, size * 8);
  wireB.position(canvasX + width, size * 9);
  resetB.position(canvasX + width, size * 39);
}

// Check if position is valid in the grid
function checkPos(x, y) {
  return x >= 0 && x < grid.length
    && y >= 0 && y < grid[0].length;
}

// Check if position is valid to palce a tile
function canPlace(x, y, tile) {
  return tile == WIRE
    || (grid[y][x] != '1'
      && grid[y][x] != 'W'
      && grid[y][x] != 'C'
      && grid[y][x] != 'S');
}

// Place a tile at x,y in the grid
function placeTile(x, y, tile, type, tier = 1) {
  if (checkPos(x, y) && canPlace(x, y, tile)) {
    let found = false;
    elements.forEach(e => { if (e.x == x && e.y == y) found = true });
    if (found) removeTile(x, y);
    switch (tile) {
      case SEED:
        switch (type) {
          case WILD: elements.push(Seed(x, y, size, WILD, tier)); break;
          case VIVID: elements.push(Seed(x, y, size, VIVID, tier)); break;
          case PRIMAL: elements.push(Seed(x, y, size, PRIMAL, tier)); break;
        }
        break;
      case COLLECTOR:
        switch (type) {
          case WILD: elements.push(Collector(x, y, size, WILD)); break;
          case VIVID: elements.push(Collector(x, y, size, VIVID)); break;
          case PRIMAL: elements.push(Collector(x, y, size, PRIMAL)); break;
        }
        break;
      case TANK:
        switch (type) {
          case WILD: elements.push(Tank(x, y, size, WILD)); break;
          case VIVID: elements.push(Tank(x, y, size, VIVID)); break;
          case PRIMAL: elements.push(Tank(x, y, size, PRIMAL)); break;
        }
        break;
      case DISPERSER:
        switch (type) {
          case WILD: elements.push(Disperser(x, y, size, WILD)); break;
          case VIVID: elements.push(Disperser(x, y, size, VIVID)); break;
          case PRIMAL: elements.push(Disperser(x, y, size, PRIMAL)); break;
        }
        break;
      case PYLON:
        switch (type) {
          case WILD: elements.push(Pylon(x, y, size, WILD)); break;
          case VIVID: elements.push(Pylon(x, y, size, VIVID)); break;
          case PRIMAL: elements.push(Pylon(x, y, size, PRIMAL)); break;
        }
        break;
      case WIRE:
        switch (type) {
          case WILD: elements.push(Wire(x, y, size, WILD)); break;
          case VIVID: elements.push(Wire(x, y, size, VIVID)); break;
          case PRIMAL: elements.push(Wire(x, y, size, PRIMAL)); break;
        }
    }
    updateURL();
  }
}

// Remove a tile at x,y in the grid
function removeTile(x, y) {
  for (let i = 0; i < elements.length; i++) {
    let eX = elements[i].x;
    let eY = elements[i].y;
    if (eX == x && eY == y) {
      makeGrid();
      elements.splice(i, 1);
      updateURL();
      break;
    }
  }
}

// Draw a border at x,y
// Used for Collectors and Dispersers
function drawBorder(x, y, color, size) {
  push();

  stroke(color);
  strokeWeight(1);
  noFill();
  rect((x - 2) * size, (y - 2) * size, size * 5, size * 5);

  pop();
}

// Draw all borders of current elements
function drawBorders() {
  elements.forEach(e => {
    if (e.letter == 'C' || e.letter == 'D') {
      drawBorder(e.x, e.y, e.color, size);
    }
  });
}

// Draw the preview of the currently selected tile
function drawPreview(x, y, tile, type, tier = 1) {
  if (checkPos(x, y) && canPlace(x, y, tile)) {
    let p;
    switch (tile) {
      case SEED:
        switch (type) {
          case WILD: p = Seed(x, y, size, WILD, tier); break;
          case VIVID: p = Seed(x, y, size, VIVID, tier); break;
          case PRIMAL: p = Seed(x, y, size, PRIMAL, tier); break;
        }
        break;
      case COLLECTOR:
        switch (type) {
          case WILD: p = Collector(x, y, size, WILD); break;
          case VIVID: p = Collector(x, y, size, VIVID); break;
          case PRIMAL: p = Collector(x, y, size, PRIMAL); break;
        }
        break;
      case TANK:
        switch (type) {
          case WILD: p = Tank(x, y, size, WILD); break;
          case VIVID: p = Tank(x, y, size, VIVID); break;
          case PRIMAL: p = Tank(x, y, size, PRIMAL); break;
        }
        break;
      case DISPERSER:
        switch (type) {
          case WILD: p = Disperser(x, y, size, WILD); break;
          case VIVID: p = Disperser(x, y, size, VIVID); break;
          case PRIMAL: p = Disperser(x, y, size, PRIMAL); break;
        }
        break;
      case PYLON:
        switch (type) {
          case WILD: p = Pylon(x, y, size, WILD); break;
          case VIVID: p = Pylon(x, y, size, VIVID); break;
          case PRIMAL: p = Pylon(x, y, size, PRIMAL); break;
        }
        break;
      case WIRE:
        switch (type) {
          case WILD: p = Wire(x, y, size, WILD); break;
          case VIVID: p = Wire(x, y, size, VIVID); break;
          case PRIMAL: p = Wire(x, y, size, PRIMAL); break;
        }
    }
    p.show();
    if (showBorders && p != null && (tile == COLLECTOR || tile == DISPERSER)) {
      drawBorder(x, y, p.color, size);
    }
  }
}

// Add/Remove tile when mouse click
function mousePressed(event) {
  let gridX = Math.floor(mouseX / size);
  let gridY = Math.floor(mouseY / size);

  // console.log(event);

  if (event.ctrlKey) {
    removeTile(gridX, gridY);
  } else if (event.button == 0) {
    placeTile(gridX, gridY, currentTile, currentType, currentTier);
  }
  return false;
}

// Lazy handling
function mouseDragged(event) {
  mousePressed(event);
}

function elementsToString() {
  let s = '';
  elements.forEach(e => { s += e.toString() + ',' });
  return s;
}

function stringToElements(s) {
  let e = [];
  let a = s.split(',');
  a.forEach(str => {
    let t = tileFromString(str, size);
    if (t != null) e.push(t);
  });
  return e;
}

// Update URL with element strings
function updateURL() {
  window.history.replaceState({}, null, '?e=' + elementsToString());
}