import { Edge, Node } from "reactflow";
import { NodeData } from "./node/NodeData";
import { EdgeData } from "./edge/EdgeData";

export interface NodesAndEdges {
    nodes: Node<NodeData>[],
    edges: Edge<EdgeData>[],
}
