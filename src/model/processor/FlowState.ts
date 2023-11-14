import { Edge, Node } from "reactflow";
import { NodeData } from "../node/NodeData";
import { EdgeData } from "../edge/EdgeData";

export class FlowState {
    constructor(
        readonly nodes: Node<NodeData>[],
        readonly edges: Edge<EdgeData>[]
    ) {
    }
}
