import { Edge, Node } from "reactflow";
import EdgeData from "../model/EdgeData";

export class FlowState {
    constructor(
        readonly nodes: Node[],
        readonly edges: Edge<EdgeData>[]
    ) {
    }
}
