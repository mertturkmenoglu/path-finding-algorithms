class GraphNode {
    constructor(algorithm, h, parent=null, position=null) {
        this.algorithm = algorithm;
        this.heuristic = h;
        this.parent = parent;
        this.position = position;
        this.f = 0;
        this.g = 0;
        this.h = 0;
    }

    calculateH(endNode) {
        if (this.algorithm !== 'astar') {
            this.h = 0;
            return;
        }

        let dx = (this.position.x - endNode.position.x);
        let dy = (this.position.y - endNode.position.y);

        if (this.heuristic === Heuristic.Euclidean) {
            this.h = Math.sqrt(dx*dx + dy*dy);
        } else {
            this.h = Math.abs(dx) + Math.abs(dy);
        }
    }

    calculateG(currentNode) {
        if ( this.position.x - currentNode.position.x === 0 || this.position.y - currentNode.position.y === 0 ) {
            this.g = currentNode.g + 1;
        } else {
            this.g = currentNode.g + Math.SQRT2
        }
    }

    calculateF() {
        this.f = this.g + this.h;
    }

    updateValues(currentNode, endNode) {
        this.calculateG(currentNode);
        this.calculateH(endNode);
        this.calculateF();
    }

    isEqual(other) {
        return ((this.position.x === other.position.x) && (this.position.y === other.position.y));
    }
}
