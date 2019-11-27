export class Position {
    constructor(public x: number, public y: number) { }
    toString() {
        return `{x:${this.x},y:${this.y}}`
    }
    middle(other: Position): Position {
        return new Position((other.x + this.x) / 2, (other.y + this.y) / 2);
    }
}