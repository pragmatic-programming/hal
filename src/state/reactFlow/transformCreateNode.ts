import { State } from "../State";
import { StoreApi } from "zustand";
import { Edge, Node } from "reactflow";
import { StateReactFlow } from "./StateReactFlow";
import { NodeData } from "../../model/node/NodeData";
import { createNodeDataFromCreationNode } from "../../model/node/createNodeData";
import { createEdgeDataCreate } from "../../model/edge/createEdgeData";
import { EdgeTypeIndicator, edgeTypeIndicators } from "../../model/edge/EdgeTypeIndicator";
import { NodeDefinition } from "../../model/node/NodeDefinition";
import { NodeTypeIndicator } from "../../model/node/NodeTypeIndicator";
import { transformCreateEdgeByEdgeDefinition } from "./transformCreateEdge";
import { retrieveEdgeDefinition } from "../../model/edge/edgeDefinitions";


export function transformCreateNode(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (nodeId: string, nodeDefinition: NodeDefinition, targetEdgeId: string | undefined): Promise<void> => {
        const reactFlow: StateReactFlow = getState().reactFlow;
        const nodes: Node[] = transformNodes(reactFlow, nodeDefinition, nodeId);
        let edges: Edge[] = reactFlow.edges;
        // if targetEdgeId is not set, no target edge exist and,
        // thus we do not need to transform edges
        if (targetEdgeId) {
            edges = transformEdges(reactFlow, nodeDefinition, targetEdgeId);
        }
        setState({
            reactFlow: {
                ...reactFlow,
                edges: edges,
                nodes: nodes,
            }
        });
    };
}

export function transformCreateNodeByNodeTypeIndicator(node: Node, type: NodeTypeIndicator): Node {
    if (node.type === "create") {
        const data: NodeData = createNodeDataFromCreationNode(type);
        node.type = type;
        node.data = data;
        node.height = data.height;
        node.width = data.width;
    }
    return node;
}

function transformNodes(reactFlow: StateReactFlow, nodeDefinition: NodeDefinition, nodeId: string): Node[] {
    return reactFlow.nodes.map((node: Node) => {
        if (node.id === nodeId) {
            node = transformCreateNodeByNodeTypeIndicator(node, nodeDefinition.type);
        }
        return node;
    });
}

function transformEdges(reactFlow: StateReactFlow, nodeDefinition: NodeDefinition, edgeId: string): Edge[] {
    // if only one sourceEdgeType exist,
    // we can transform the target edge
    if (nodeDefinition.sourceEdgeTypes.length === 1) {
        return reactFlow.edges.map((edge: Edge) => {
            if (edge.id === edgeId) {
                const firstSourceEdgeType: EdgeTypeIndicator = nodeDefinition.sourceEdgeTypes[0];
                edge = transformCreateEdgeByEdgeDefinition(
                    edge,
                    retrieveEdgeDefinition(firstSourceEdgeType)
                );
            }
            return edge;
        });
    }
    return reactFlow.edges.map((edge: Edge) => {
        if (edge.id === edgeId) {
            if (edge.type !== "create") {
                throw new Error("Edge is not from type create");
            }
            edge.data = createEdgeDataCreate(deniedEdgeTypes(nodeDefinition));
        }
        return edge;
    });
}

function deniedEdgeTypes(nodeDefinition: NodeDefinition): EdgeTypeIndicator[] {
    return edgeTypeIndicators.filter((edge: EdgeTypeIndicator) => !nodeDefinition.sourceEdgeTypes.includes(edge));
}
