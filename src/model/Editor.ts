import { Dimension } from "./Dimension";
import { Position } from "./Position";
import { Edge } from "./Edge";

export class Editor {
    constructor(
        readonly id: number,
        readonly dimension: Dimension,
        readonly position: Position,
        readonly language: string,
        readonly value: string,
        readonly edges: Edge[] = []
    ) {
    }

    moved(delta: Position): Editor {
        return new Editor(
            this.id,
            this.dimension,
            this.position.moved(delta),
            this.language,
            this.value,
            this.edges
        );
    }
}
