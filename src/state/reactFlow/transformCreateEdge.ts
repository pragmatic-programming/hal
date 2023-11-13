import { State } from "../State";
import { StoreApi } from "zustand";
import { EdgeTypeIndicator } from "../../model/edge/EdgeTypeIndicator";
import { createEdgeId } from "../../model/edge/createEdge";
import { Edge, Node } from "reactflow";
import { createNodeDataFromCreationNode } from "../../model/node/createNodeData";
import { NodeTypeIndicator } from "../../model/node/NodeTypeIndicator";
import { NodeData } from "../../model/node/NodeData";

export function transformCreateEdge(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (edgeId: string, edgeType: EdgeTypeIndicator, targetNodeId: string, targetNodeTypes: NodeTypeIndicator[]) => {
        const reactFlow = getState().reactFlow;
        let nodes = reactFlow.nodes;
        if (targetNodeTypes.length === 1) {
            nodes = reactFlow.nodes.map((node: Node) => {
                if (node.id === targetNodeId) {
                    node.type = targetNodeTypes[0];
                    if (node.data.type !== "create") {
                        throw new Error("Node is not from typ create");
                    }
                    const data: NodeData = createNodeDataFromCreationNode(targetNodeTypes[0]);
                    node.data = data;
                    node.height = data.height;
                    node.width = data.width;
                }
                return node;
            });
        }
        const edges = reactFlow.edges.map((edge: Edge) => {
            if (edge.id === edgeId) {
                if (edge.type !== "create") {
                    throw new Error("Edge is not from typ create");
                }
                edge.id = createEdgeId(edge.source, edge.target, edgeType);
                edge.type = edgeType;
                edge.label = edgeType;
            }
            return edge;
        });
        setState({
            reactFlow: {
                ...reactFlow,
                edges: edges,
                nodes: nodes,
            }
        });
    };
}
