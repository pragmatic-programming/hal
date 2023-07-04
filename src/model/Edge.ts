import { Position } from "./Position";
import { EdgeStyle } from "./EdgeStyle";

export class Edge {
    // todo use real key or id
    readonly key = crypto.randomUUID();

    constructor(
        readonly from: number,
        readonly to: number,
        readonly start: Position,
        readonly end: Position,
        readonly style: EdgeStyle = EdgeStyle.solid
    ) {
    }

}
