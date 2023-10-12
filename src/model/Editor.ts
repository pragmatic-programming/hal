import { Dimension } from "./Dimension";
import { Position } from "./Position";

export class Editor {
    constructor(
        readonly id: number,
        readonly dimension: Dimension,
        readonly position: Position,
        readonly language: string,
        readonly value: string | undefined,
    ) {
    }

    moved(delta: Position): Editor {
        return new Editor(
            this.id,
            this.dimension,
            this.position.moved(delta),
            this.language,
            this.value,
        );
    }

    updatedValue(value: string | undefined): Editor {
        return new Editor(
            this.id,
            this.dimension,
            this.position,
            this.language,
            value,
        );
    }
}
