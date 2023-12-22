export type Pos = [number, number];

export function posEq(a: Pos, b: Pos): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function posDiff(a: Pos, b: Pos): [number, number] {
  return [a[0] - b[0], a[1] - b[1]];
}
