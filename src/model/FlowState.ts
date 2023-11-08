import { Edge, Node } from "reactflow";
import { NodeData } from "./NodeData";

export class FlowState {
    constructor(
        readonly nodes: Node<NodeData>[],
        readonly edges: Edge[]
    ) {
    }
}
