import { Pos } from './Pos';

type GridElement = 'Empty' | 'Start' | 'End' | 'Block' | 'Path';

export class Grid {
  private mtr: GridElement[][] = [];

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

  clearPath(): void {
    const [rows, cols] = this.dims();
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const el = this.at(i, j);

        if (el === 'Path') {
          this.set(i, j, 'Empty');
        }
      }
    }
  }

  reset(fill: GridElement = 'Empty'): void {
    const [rows, cols] = this.dims();

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.set(i, j, fill);
      }
    }
  }

  getSingleCharAt(row: number, col: number): string {
    const el = this.at(row, col);
    const map: Record<GridElement, string> = {
      Start: 'S',
      End: 'E',
      Block: 'B',
      Path: 'P',
      Empty: '',
    };
    return map[el];
  }

  isWalkable(pos: Pos): boolean {
    return this.atPos(pos) !== 'Block';
  }

  isValidPos(pos: Pos): boolean {
    return this.isPosInGrid(pos) && this.isWalkable(pos);
  }

  getCardinalNeighboursPos(pos: Pos): Pos[] {
    const [r, c] = pos;
    const moves: Pos[] = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ];

    const neighbours: Pos[] = [];

    for (const [dr, dc] of moves) {
      const newPos: Pos = [r + dr, c + dc];
      if (this.isValidPos(newPos)) {
        neighbours.push(newPos);
      }
    }

    return neighbours;
  }

  toString(): string {
    return JSON.stringify(this.mtr);
  }

  equal(other: Grid): boolean {
    return this.toString() === other.toString();
  }
}
