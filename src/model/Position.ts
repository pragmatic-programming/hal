import { Translate } from "@dnd-kit/core";

export class Position {
    constructor(
        readonly x: number,
        readonly y: number
    ) {
    }

    public static create(coordinates: Translate):Position{
       return new Position(
           coordinates.x,
           coordinates.y
       )
    }

    moved(delta: Position): Position {
        return new Position(
            this.x + delta.x,
            this.y + delta.y
        );
    }
}
