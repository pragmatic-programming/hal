import { Dimension } from "./Dimension";
import { Position } from "./Position";

export class Editor {
    constructor(
        readonly id: number,
        readonly dimension: Dimension,
        readonly position: Position,
        readonly language: string,
        readonly value: string,
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

}
