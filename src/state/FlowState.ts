import { Edge, Node } from "reactflow";
import NodeData from "../model/NodeData";

export class FlowState {
    constructor(
        readonly nodes: Node<NodeData>[],
        readonly edges: Edge[]
    ) {
    }
}
