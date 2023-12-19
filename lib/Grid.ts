export type Pos = [number, number];

export class Grid<T> {
  private mtr: T[][] = [];

  constructor(list: T[][] = []) {
    this.mtr = list;
  }

  init(rows: number, cols: number, fill: T): Grid<T> {
    console.log('initing');
    this.mtr = new Array(rows).fill(0).map(() => new Array(cols).fill(fill));
    console.table(this.mtr);
    return this;
  }

  rows(): T[][] {
    return this.mtr;
  }

  at(row: number, col: number): T {
    return this.mtr[row][col];
  }

  atPos(pos: Pos): T {
    return this.at(pos[0], pos[1]);
  }

  set(row: number, col: number, v: T): void {
    this.mtr[row][col] = v;
  }

  setPos(pos: Pos, v: T): void {
    this.set(pos[0], pos[1], v);
  }

  dims(): [number, number] {
    return [this.mtr.length, this.mtr[0]!.length];
  }

  isValueInGrid(v: T): boolean {
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

  toString(): string {
    return JSON.stringify(this.mtr);
  }

  equal(other: Grid<T>): boolean {
    return this.toString() === other.toString();
  }
}
