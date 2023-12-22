export type Pos = [number, number];

export function posEq(a: Pos, b: Pos): boolean {
  return a[0] === b[0] && a[1] === b[1];
}

export function posDiff(a: Pos, b: Pos): [number, number] {
  return [a[0] - b[0], a[1] - b[1]];
}
