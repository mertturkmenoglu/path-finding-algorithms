import { Pos } from './Pos';

export type GridElement =
  | 'Empty'
  | 'Start'
  | 'End'
  | 'Block'
  | 'Path'
  | 'Visited';

export class Grid {
  private mtr: GridElement[][] = [];
  private readonly cardinalMoveset: Pos[] = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];
  private readonly diagonalMoveset: Pos[] = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  constructor(list: GridElement[][] = []) {
    this.mtr = list;
  }

  init(rows: number, cols: number, fill: GridElement): Grid {
    this.mtr = new Array(rows).fill(0).map(() => new Array(cols).fill(fill));
    return this;
  }

  rows(): GridElement[][] {
    return this.mtr;
  }

  at(row: number, col: number): GridElement {
    return this.mtr[row][col];
  }

  atPos(pos: Pos): GridElement {
    return this.at(pos[0], pos[1]);
  }

  set(row: number, col: number, v: GridElement): void {
    this.mtr[row][col] = v;
  }

  setPos(pos: Pos, v: GridElement): void {
    this.set(pos[0], pos[1], v);
  }

  dims(): [number, number] {
    return [this.mtr.length, this.mtr[0]!.length];
  }

  isPosInGrid(pos: Pos): boolean {
    const [rows, cols] = this.dims();
    const [r, c] = pos;

    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      return false;
    }

    return true;
  }

  isValueInGrid(v: GridElement): boolean {
    const [rows, cols] = this.dims();

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (this.at(i, j) === v) {
          return true;
        }
      }
    }

    return false;
  }

  clearPathAndVisited(): void {
    this.forEach((i, j, el) => {
      if (el === 'Path' || el === 'Visited') {
        this.set(i, j, 'Empty');
      }
    });
  }

  reset(fill: GridElement = 'Empty'): void {
    this.forEach((i, j) => {
      this.set(i, j, fill);
    });
  }

  getSingleCharAt(row: number, col: number): string {
    const el = this.at(row, col);
    const map: Record<GridElement, string> = {
      Start: 'S',
      End: 'E',
      Block: 'B',
      Path: 'P',
      Visited: 'V',
      Empty: '',
    };
    return map[el];
  }

  randomFill(chance: number): void {
    this.reset();
    this.forEach((i, j) => {
      this.set(i, j, Math.random() > chance ? 'Block' : 'Empty');
    });
  }

  private rand(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  getRandomPos(): Pos {
    const [rows, cols] = this.dims();
    return [this.rand(0, rows), this.rand(0, cols)];
  }

  isWalkable(pos: Pos): boolean {
    return this.atPos(pos) !== 'Block';
  }

  isValidPos(pos: Pos): boolean {
    return this.isPosInGrid(pos) && this.isWalkable(pos);
  }

  private neighbours(pos: Pos, moveset: Pos[]): Pos[] {
    const [r, c] = pos;

    const neighbours: Pos[] = [];

    for (const [dr, dc] of moveset) {
      const newPos: Pos = [r + dr, c + dc];
      if (this.isValidPos(newPos)) {
        neighbours.push(newPos);
      }
    }

    return neighbours;
  }

  getCardinalNeighboursPos(pos: Pos): Pos[] {
    return this.neighbours(pos, this.cardinalMoveset);
  }

  getDiagonalNeighboursPos(pos: Pos): Pos[] {
    return this.neighbours(pos, this.diagonalMoveset);
  }

  getAllNeighboursPos(pos: Pos): Pos[] {
    return this.neighbours(pos, [
      ...this.cardinalMoveset,
      ...this.diagonalMoveset,
    ]);
  }

  forEach(fn: (r: number, c: number, el: GridElement) => void): void {
    const [rows, cols] = this.dims();

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        fn(i, j, this.at(i, j));
      }
    }
  }

  toString(): string {
    return JSON.stringify(this.mtr);
  }

  equal(other: Grid): boolean {
    return this.toString() === other.toString();
  }
}
