import { BfsNode, GraphNode, TAlgorithm, THeuristic } from './GraphNode';
import { Grid } from './Grid';
import { Pos, posEq } from './Pos';

export type Res =
  | PathFindingResult<GraphNode>
  | PathFindingResult<BfsNode>
  | null;

export interface PathFindingResult<T> {
  path: T[];
  visited: T[];
}

function constructPath<T extends { parent: T | null }>(child: T): T[] {
  const path: T[] = [];
  let current: T | null = child;

  while (current !== null) {
    path.push(current);
    current = current.parent;
  }

  path.reverse();

  return path;
}

export function astar(
  g: Grid,
  start: Pos,
  end: Pos,
  heuristic: THeuristic,
  algorithm: TAlgorithm = 'astar'
): PathFindingResult<GraphNode> {
  const open: GraphNode[] = [];
  const closed: GraphNode[] = [];
  const startNode = new GraphNode(algorithm, heuristic, null, start);
  const endNode = new GraphNode(algorithm, heuristic, null, end);

  open.push(startNode);

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f);

    const q = open.shift()!;
    closed.push(q);

    if (posEq(q.pos, end)) {
      return {
        path: constructPath(q),
        visited: [...closed, ...open],
      };
    }

    const children = g
      .getCardinalNeighboursPos(q.pos)
      .map((p) => new GraphNode(algorithm, heuristic, q, p));

    for (const successor of children) {
      successor.updateValues(endNode);

      const has = (n: GraphNode) => posEq(n.pos, successor.pos);

      if (closed.some(has)) {
        continue;
      }

      if (!open.some(has)) {
        open.push(successor);
      } else {
        const index = open.findIndex((n) => n.isEqual(successor));

        if (index !== -1 && open[index].f > successor.f) {
          open[index] = successor;
        }
      }
    }
  }

  return {
    path: [],
    visited: closed,
  };
}

export function dijkstra(
  g: Grid,
  start: Pos,
  end: Pos
): PathFindingResult<GraphNode> {
  return astar(g, start, end, 'euclidean', 'dijkstra');
}

export function bfs(g: Grid, start: Pos, end: Pos): PathFindingResult<BfsNode> {
  const startNode = new BfsNode(null, start);
  const open: BfsNode[] = [startNode];
  const closed: BfsNode[] = [];

  while (open.length > 0) {
    const q = open.shift()!;
    closed.push(q);

    if (posEq(q.pos, end)) {
      return {
        path: constructPath(q),
        visited: [...closed, ...open],
      };
    }

    const children = g
      .getCardinalNeighboursPos(q.pos)
      .map((p) => new BfsNode(q, p));

    for (const child of children) {
      const has = (n: BfsNode) => posEq(n.pos, child.pos);

      if (closed.some(has) || open.some(has)) {
        continue;
      }

      open.push(child);
    }
  }

  return {
    path: [],
    visited: closed,
  };
}

export function dfs(g: Grid): void {
  const [rows, cols] = g.dims();

  // Make walls
  for (let i = 0; i < rows; i += 2) {
    for (let j = 0; j < cols; j++) {
      g.set(i, j, 'Block');
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j += 2) {
      g.set(i, j, 'Block');
    }
  }

  // Choose start point
  let pos: Pos = [1, 1];
  g.setPos(pos, 'Visited');

  const stack: Pos[] = [];
  stack.push(pos);

  while (stack.length > 0) {
    const [r, c] = stack.pop()!;

    const validNeighbors: Pos[] = [];
    const straightMoves: Pos[] = [
      [0, -2],
      [0, 2],
      [-2, 0],
      [2, 0],
    ];

    for (let [dr, dc] of straightMoves) {
      const newPos: Pos = [r + dr, c + dc];
      if (!g.isPosInGrid(newPos) || g.atPos(newPos) === 'Visited') {
        continue;
      }

      validNeighbors.push(newPos);
    }

    // If we have available neighbor(s), we choose a random neighbor
    // and remove the wall(obstacle cell) between these two cell.
    if (validNeighbors.length > 0) {
      stack.push([r, c]);
      const [nr, nc] =
        validNeighbors[Math.floor(Math.random() * validNeighbors.length)];

      if (nr === r) {
        g.set(nr, c + (nc > c ? 1 : -1), 'Empty');
      } else {
        // Same column
        g.set(nr + (r > r ? 1 : -1), nc, 'Empty');
      }

      g.set(nr, nc, 'Visited');
      stack.push([nr, nc]);
    }
  }

  // Cells were marked as visited. Mark them as empty again.
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (g.at(i, j) === 'Visited') {
        g.set(i, j, 'Empty');
      }
    }
  }
}
