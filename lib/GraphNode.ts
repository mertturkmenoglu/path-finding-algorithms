import { Pos, posDiff, posEq } from './Pos';

export type TAlgorithm = 'astar' | 'dijkstra' | 'bfs';

export type THeuristic = 'manhattan' | 'euclidean';

export class BfsNode {
  private g: number = 0;

  constructor(
    public parent: BfsNode | null,
    public pos: Pos
  ) {
    if (parent !== null) {
      const [dx, dy] = posDiff(pos, parent.pos);

      if (dx === 0 || dy === 0) {
        this.g = parent.g + 1;
      } else {
        this.g = parent.g + Math.SQRT2;
      }
    }
  }

  isEqual(other: BfsNode): boolean {
    return posEq(this.pos, other.pos);
  }
}

export class GraphNode {
  public f = Number.MAX_SAFE_INTEGER;
  public g = Number.MAX_SAFE_INTEGER;
  public h = Number.MAX_SAFE_INTEGER;

  constructor(
    public readonly algorithm: TAlgorithm,
    public readonly heuristic: THeuristic,
    public parent: GraphNode | null = null,
    public pos: Pos
  ) {}

  calculateH(endNode: GraphNode) {
    if (this.algorithm !== 'astar') {
      this.h = 0;
      return;
    }

    const [dx, dy] = posDiff(this.pos, endNode.pos);

    if (this.heuristic === 'euclidean') {
      this.h = Math.sqrt(dx * dx + dy * dy);
    } else {
      this.h = Math.abs(dx) + Math.abs(dy);
    }
  }

  calculateG() {
    if (this.parent === null) {
      this.g = 0;
      return;
    }

    const [dx, dy] = posDiff(this.pos, this.parent.pos);

    if (dx === 0 || dy === 0) {
      this.g = this.parent.g + 1;
    } else {
      this.g = this.parent.g + Math.SQRT2;
    }
  }

  calculateF() {
    this.f = this.g + this.h;
  }

  updateValues(endNode: GraphNode) {
    this.calculateG();
    this.calculateH(endNode);
    this.calculateF();
  }

  isEqual(other: GraphNode) {
    return posEq(this.pos, other.pos);
  }
}
