export class Position {
    constructor(
        readonly x: number,
        readonly y: number
    ) {
    }

    moved(delta: Position): Position {
        return new Position(
            this.x + delta.x,
            this.y + delta.y
        );
    }
}
