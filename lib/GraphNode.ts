import { Pos, posDiff, posEq } from './Pos';

export type TAlgorithm = 'astar' | 'dijkstra' | 'bfs';

export type THeuristic = 'manhattan' | 'euclidean';

export class GraphNode {
  public f = 0;
  public g = 0;
  public h = 0;

  constructor(
    public readonly algorithm: TAlgorithm,
    public readonly heuristic: THeuristic,
    public parent: GraphNode | null = null,
    public position: Pos
  ) {}

  calculateH(endNode: GraphNode) {
    if (this.algorithm !== 'astar') {
      this.h = 0;
      return;
    }

    const [dx, dy] = posDiff(this.position, endNode.position);

    if (this.heuristic === 'euclidean') {
      this.h = Math.sqrt(dx * dx + dy * dy);
    } else {
      this.h = Math.abs(dx) + Math.abs(dy);
    }
  }

  calculateG(currentNode: GraphNode) {
    const [dx, dy] = posDiff(this.position, currentNode.position);

    if (dx === 0 || dy === 0) {
      this.g = currentNode.g + 1;
    } else {
      this.g = currentNode.g + Math.SQRT2;
    }
  }

  calculateF() {
    this.f = this.g + this.h;
  }

  updateValues(currentNode: GraphNode, endNode: GraphNode) {
    this.calculateG(currentNode);
    this.calculateH(endNode);
    this.calculateF();
  }

  isEqual(other: GraphNode) {
    return posEq(this.position, other.position);
  }
}
