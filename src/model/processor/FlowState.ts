import { Edge, Node } from "reactflow";
import { NodeData } from "../node/NodeData";

export class FlowState {
    constructor(
        readonly nodes: Node<NodeData>[],
        readonly edges: Edge[]
    ) {
    }
}
