import { GraphNode, TAlgorithm, THeuristic } from './GraphNode';
import { Grid } from './Grid';
import { Pos, posEq } from './Pos';
import Heap from 'heap';

const moves: Pos[] = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

function constructPath(child: GraphNode): GraphNode[] {
  const path: GraphNode[] = [];
  let current: GraphNode | null = child;

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
): GraphNode[] {
  const open = new Heap<GraphNode>((a, b) => a.f - b.f);
  const closed: GraphNode[] = [];
  const startNode = new GraphNode(algorithm, heuristic, null, start);
  const endNode = new GraphNode(algorithm, heuristic, null, end);

  open.push(startNode);

  while (!open.empty()) {
    const q = open.pop()!;
    const children: GraphNode[] = [];

    for (const [dr, dc] of moves) {
      const newPos: Pos = [q.pos[0] + dr, q.pos[1] + dc];
      if (g.isValidPos(newPos)) {
        children.push(new GraphNode('astar', heuristic, q, newPos));
      }
    }

    for (const successor of children) {
      if (posEq(successor.pos, end)) {
        return constructPath(successor);
      }

      successor.updateValues(endNode);

      const lowerF = (n: GraphNode) =>
        posEq(n.pos, successor.pos) && n.f < successor.f;

      if (
        open.toArray().some(lowerF) ||
        closed.some(lowerF) ||
        closed.some((n) => posEq(n.pos, successor.pos))
      ) {
        continue;
      }

      open.push(successor);
    }

    closed.push(q);
  }

  return [];
}

export function dijkstra(g: Grid, start: Pos, end: Pos): GraphNode[] {
  return astar(g, start, end, 'euclidean', 'dijkstra');
}
