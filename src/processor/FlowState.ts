import { Edge, Node } from "reactflow";
import { NodeData } from "../model/node/NodeData";
import { EdgeData } from "../model/edge/EdgeData";

export class FlowState {
    constructor(
        readonly nodes: Node<NodeData>[],
        readonly edges: Edge<EdgeData>[]
    ) {
    }
}
