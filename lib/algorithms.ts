import { BfsNode, GraphNode, TAlgorithm, THeuristic } from './GraphNode';
import { Grid } from './Grid';
import { Pos, posEq } from './Pos';

interface PathFindingResult<T> {
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
    const q = open.shift()!;
    const children = g
      .getCardinalNeighboursPos(q.pos)
      .map((p) => new GraphNode(algorithm, heuristic, q, p));

    for (const successor of children) {
      if (posEq(successor.pos, end)) {
        return {
          path: constructPath(successor),
          visited: closed,
        };
      }

      successor.updateValues(endNode);

      const lowerF = (n: GraphNode) =>
        posEq(n.pos, successor.pos) && n.f < successor.f;

      if (
        open.some(lowerF) ||
        closed.some(lowerF) ||
        closed.some((n) => posEq(n.pos, successor.pos))
      ) {
        continue;
      } else {
        closed.push(successor);
        open.push(successor);
        open.sort((a, b) => a.f - b.f);
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
  const endNode = new BfsNode(null, end);
  const open: BfsNode[] = [startNode];
  const closed: BfsNode[] = [];

  while (open.length > 0) {
    const q = open.shift()!;
    const children = g
      .getCardinalNeighboursPos(q.pos)
      .map((p) => new BfsNode(q, p));

    for (const child of children) {
      if (child.isEqual(endNode)) {
        return {
          path: constructPath(child),
          visited: closed,
        };
      }

      if (closed.some((n) => posEq(n.pos, child.pos))) {
        continue;
      } else {
        closed.push(child);
        open.push(child);
      }
    }
  }

  return {
    path: [],
    visited: closed,
  };
}
