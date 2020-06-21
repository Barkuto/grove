const WILD = "WILD";
const VIVID = "VIVID";
const PRIMAL = "PRIMAL";

const SEED = "SEED";
const COLLECTOR = "COLLECTOR";
const TANK = "TANK";
const DISPERSER = "DISPERSER";
const PYLON = "PYLON";
const WIRE = "WIRE";

let WILD_COLOR = 'purple';
let VIVID_COLOR = 'yellow';
let PRIMAL_COLOR = 'cyan';

function Seed(x, y, size, type, tier) {
    switch (type) {
        case WILD: return new Tile(x, y, size, WILD_COLOR, '' + tier); break;
        case VIVID: return new Tile(x, y, size, VIVID_COLOR, '' + tier); break;
        case PRIMAL: return new Tile(x, y, size, PRIMAL_COLOR, '' + tier); break;
    }
}

function Collector(x, y, size, type) {
    switch (type) {
        case WILD: return new Tile(x, y, size, WILD_COLOR, 'C'); break;
        case VIVID: return new Tile(x, y, size, VIVID_COLOR, 'C'); break;
        case PRIMAL: return new Tile(x, y, size, PRIMAL_COLOR, 'C'); break;
    }
}

function Tank(x, y, size, type) {
    switch (type) {
        case WILD: return new Tile(x, y, size, WILD_COLOR, 'T'); break;
        case VIVID: return new Tile(x, y, size, VIVID_COLOR, 'T'); break;
        case PRIMAL: return new Tile(x, y, size, PRIMAL_COLOR, 'T'); break;
    }
}

function Disperser(x, y, size, type) {
    switch (type) {
        case WILD: return new Tile(x, y, size, WILD_COLOR, 'D'); break;
        case VIVID: return new Tile(x, y, size, VIVID_COLOR, 'D'); break;
        case PRIMAL: return new Tile(x, y, size, PRIMAL_COLOR, 'D'); break;
    }
}

function Pylon(x, y, size, type) {
    switch (type) {
        case WILD: return new Tile(x, y, size, WILD_COLOR, 'P'); break;
        case VIVID: return new Tile(x, y, size, VIVID_COLOR, 'P'); break;
        case PRIMAL: return new Tile(x, y, size, PRIMAL_COLOR, 'P'); break;
    }
}

function Wire(x, y, size, type) {
    switch (type) {
        case WILD: return new Tile(x, y, size, WILD_COLOR, ''); break;
        case VIVID: return new Tile(x, y, size, VIVID_COLOR, ''); break;
        case PRIMAL: return new Tile(x, y, size, PRIMAL_COLOR, ''); break;
    }
}

class Tile {
    constructor(x, y, size, color, letter) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.letter = letter;
    }

    show() {
        push();

        fill(this.color);
        rect(this.x * this.size, this.y * this.size, this.size, this.size);

        fill(255);
        stroke(0);
        strokeWeight(2);
        textAlign(CENTER, CENTER);
        textSize(this.size);

        text(this.letter, this.x * this.size + this.size / 10, this.y * this.size + this.size / 10, this.size, this.size);

        pop();
    }
}