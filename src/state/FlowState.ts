import { Edge, Node } from "reactflow";
import EdgeData from "../model/EdgeData";
import NodeData from "../model/NodeData";

export class FlowState {
    constructor(
        readonly nodes: Node<NodeData>[],
        readonly edges: Edge<EdgeData>[]
    ) {
    }
}
