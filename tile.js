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
        case WILD: return new Tile(x, y, size, WILD_COLOR, '' + tier).setTypeTile(type, SEED); break;
        case VIVID: return new Tile(x, y, size, VIVID_COLOR, '' + tier).setTypeTile(type, SEED); break;
        case PRIMAL: return new Tile(x, y, size, PRIMAL_COLOR, '' + tier).setTypeTile(type, SEED); break;
    }
}

function Collector(x, y, size, type) {
    switch (type) {
        case WILD: return new Tile(x, y, size, WILD_COLOR, 'C').setTypeTile(type, COLLECTOR); break;
        case VIVID: return new Tile(x, y, size, VIVID_COLOR, 'C').setTypeTile(type, COLLECTOR); break;
        case PRIMAL: return new Tile(x, y, size, PRIMAL_COLOR, 'C').setTypeTile(type, COLLECTOR); break;
    }
}

function Tank(x, y, size, type) {
    switch (type) {
        case WILD: return new Tile(x, y, size, WILD_COLOR, 'T').setTypeTile(type, TANK); break;
        case VIVID: return new Tile(x, y, size, VIVID_COLOR, 'T').setTypeTile(type, TANK); break;
        case PRIMAL: return new Tile(x, y, size, PRIMAL_COLOR, 'T').setTypeTile(type, TANK); break;
    }
}

function Disperser(x, y, size, type) {
    switch (type) {
        case WILD: return new Tile(x, y, size, WILD_COLOR, 'D').setTypeTile(type, DISPERSER); break;
        case VIVID: return new Tile(x, y, size, VIVID_COLOR, 'D').setTypeTile(type, DISPERSER); break;
        case PRIMAL: return new Tile(x, y, size, PRIMAL_COLOR, 'D').setTypeTile(type, DISPERSER); break;
    }
}

function Pylon(x, y, size, type) {
    switch (type) {
        case WILD: return new Tile(x, y, size, WILD_COLOR, 'P').setTypeTile(type, PYLON); break;
        case VIVID: return new Tile(x, y, size, VIVID_COLOR, 'P').setTypeTile(type, PYLON); break;
        case PRIMAL: return new Tile(x, y, size, PRIMAL_COLOR, 'P').setTypeTile(type, PYLON); break;
    }
}

function Wire(x, y, size, type) {
    switch (type) {
        case WILD: return new Tile(x, y, size, WILD_COLOR, '').setTypeTile(type, WIRE); break;
        case VIVID: return new Tile(x, y, size, VIVID_COLOR, '').setTypeTile(type, WIRE); break;
        case PRIMAL: return new Tile(x, y, size, PRIMAL_COLOR, '').setTypeTile(type, WIRE); break;
    }
}

function tileFromString(s, size) {
    let a = s.split('|');
    if (a.length == 4) {
        let x = parseInt(a[0]);
        let y = parseInt(a[1]);
        let tile = a[2];
        let type = a[3];

        if (type == WILD || type == VIVID || type == PRIMAL) {
            switch (tile) {
                case COLLECTOR: return Collector(x, y, size, type); break;
                case TANK: return Tank(x, y, size, type); break;
                case DISPERSER: return Disperser(x, y, size, type); break;
                case PYLON: return Pylon(x, y, size, type); break;
                case WIRE: return Wire(x, y, size, type); break;
            }
        }
    } else if (a.length == 5) {
        let x = parseInt(a[0]);
        let y = parseInt(a[1]);
        let tile = a[2];
        let type = a[3];
        let tier = parseInt(a[4]);

        if (type == WILD || type == VIVID || type == PRIMAL) {
            switch (tile) {
                case SEED: return Seed(x, y, size, type, tier); break;
            }
        }
    }
    return null;
}

class Tile {
    constructor(x, y, size, color, letter) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.letter = letter;
    }

    setTypeTile(type, tile) {
        this.type = type;
        this.tile = tile;
        return this;
    }

    toString() {
        let s = this.x + '|' + this.y + '|' + this.tile + '|' + this.type;
        if (this.tile == SEED) {
            s += '|' + this.letter;
        }
        return s;
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