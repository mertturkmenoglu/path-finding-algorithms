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
        this.h = a*a + b*b;
    }

    calculateG(currentNode) {
        this.g = currentNode.g + 1;
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
