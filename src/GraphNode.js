class GraphNode {
    constructor(parent=null, pos=null) {
        this.parent = parent;
        this.pos = pos;
        this.f = 0;
        this.g = 0;
        this.h = 0;
    }

    calculateH(endNode) {
        let a = (this.pos[0] - endNode.pos[0]);
        let b = (this.pos[1] - endNode.pos[1]);
        this.h = Math.sqrt(a*a + b*b);
    }

    calculateG(currentNode) {
        if ( this.pos[0] - currentNode.pos[0] === 0 || this.pos[1] - currentNode.pos[1] === 0 ) {
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
        return ((this.pos[0] === other.pos[0]) && (this.pos[1] === other.pos[1]));
    }
}
