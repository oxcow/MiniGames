'use strict';

const Matrix = new Array(20);
for (let i = 0; i < 20; i++) {
  Matrix.push(new Array(10).fill(0));
}
console.log("Matrix =>", Matrix);
console.log('------------------------');

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Tile extends Point {
  constructor(x, y) {
    super(x, y);
  }
}

class TileCoordinate {
  constructor(x, y, v) {
    this.x = x;
    this.y = y;
    this.v = v;
  }
}

class Tetris {
  constructor(tiles) {
    this.tiles = tiles;
    this.m = tiles.length;
    this.n = tiles[0].length;
  }

  coordinate = (refPoint) => {
    const coords = [];
    for (let r = 0; r < this.m; r++) {
      for (let c = 0; c < this.n; c++) {
        let x = refPoint.x + c;
        let y = refPoint.y + (this.m - r - 1)
        coords.push(new TileCoordinate(x, y, this.tiles[r][c]));
      }
    }
    return coords;
  }
  rotate = () => {
    const _tiles = Array.from({length: this.n}, () => new Array(this.m));
    for (let j = 0; j < this.n; j++) {
      for (let i = 0; i < this.m; i++) {
        _tiles[j][i] = this.tiles[this.m - i - 1][j];
      }
    }
    this.m = _tiles.length
    this.n = _tiles[0].length;
    this.tiles = _tiles;
    return this;
  }
}

class TetrisO extends Tetris {
  constructor() {
    super([[1, 1], [1, 1]]);
  }

  rotate = () => {
  }
}

class TetrisL extends Tetris {
  constructor() {
    super([[1, 0], [1, 0], [1, 1]]);
  }
}

class TetrisT extends Tetris {
  constructor() {
    super([[1, 1, 1], [0, 1, 0]]);
  }
}

class TetrisS extends Tetris {
  constructor() {
    super([[0, 1, 1], [1, 1, 0]]);
  }
}

class TetrisZ extends Tetris {
  constructor() {
    super([[1, 1, 0], [0, 1, 1]]);
  }
}

class TetrisI extends Tetris {
  constructor() {
    super([[1, 1, 1, 1]]);
  }
}

class TetrisJ extends Tetris {
  constructor() {
    super([[0, 1], [0, 1], [1, 1]]);
  }
}

//
const RefPoint = new Point(2, 10);
const t = new TetrisL();
console.log(t.coordinate(RefPoint));
console.log(t.rotate().coordinate(RefPoint));

// console.log(new TetrisS().coordinate(RefPoint));
// console.log(new TetrisL().coordinate(RefPoint));
// console.log(new TetrisJ().coordinate(RefPoint));
// console.log(new TetrisZ().coordinate(RefPoint));
// console.log(new TetrisO().coordinate(RefPoint));

export {Point, Tetris, TetrisI, TetrisT, TetrisL, TetrisO, TetrisJ, TetrisS, TetrisZ}