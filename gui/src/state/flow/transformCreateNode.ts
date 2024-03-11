import { State } from "../State";
import { StoreApi } from "zustand";
import { Edge, Node } from "reactflow";
import { StateFlow } from "./StateFlow";
import { EdgeTypeIndicator, edgeTypeIndicators } from "../../model/edge/EdgeTypeIndicator";
import { NodeDefinition } from "../../model/node/NodeDefinition";
import { retrieveEdgeDefinition } from "../../model/edge/edgeDefinitions";
import { EdgeDataFactory } from "../../model/edge/EdgeDataFactory";
import { NodeFactory } from "../../model/node/NodeFactory";
import { EdgeFactory } from "../../model/edge/EdgeFactory";


export function transformCreateNode(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (nodeId: string, nodeDefinition: NodeDefinition, targetEdgeId: string | null | undefined): Promise<void> => {
        const reactFlow: StateFlow = getState().flow;
        const nodes: Node[] = transformNodes(reactFlow, nodeDefinition, nodeId);
        let edges: Edge[] = reactFlow.edges;
        // if targetEdgeId is not set, no target edge exist and,
        // thus we do not need to transform edges
        if (targetEdgeId) {
            edges = transformEdges(reactFlow, nodeDefinition, targetEdgeId);
        }
        setState({
            flow: {
                ...reactFlow,
                edges: edges,
                nodes: nodes,
            }
        });
    };
}

function transformNodes(reactFlow: StateFlow, nodeDefinition: NodeDefinition, nodeId: string): Node[] {
    return reactFlow.nodes.map((node: Node) => {
        if (node.id === nodeId) {
            if (node.type === "create") {
                node = NodeFactory.fromCreationNode(node, nodeDefinition.type);
            }
        }
        return node;
    });
}

function transformEdges(reactFlow: StateFlow, nodeDefinition: NodeDefinition, edgeId: string): Edge[] {
    // if only one sourceEdgeType exist,
    // we can transform the target edge
    if (nodeDefinition.sourceEdgeTypes.length === 1) {
        return reactFlow.edges.map((edge: Edge) => {
            if (edge.id === edgeId) {
                const firstSourceEdgeType: EdgeTypeIndicator = nodeDefinition.sourceEdgeTypes[0];
                edge = EdgeFactory.fromCreationEdge(
                    edge,
                    retrieveEdgeDefinition(firstSourceEdgeType)
                );
            }
            return edge;
        });
    }
    // if nodeDefinition has more than one sourceEdgeType we can not transform the edge,
    // but we might update the deniedEdgeTypes, based on the sourceEdgeType of the nodeDefinition
    return reactFlow.edges.map((edge: Edge) => {
        if (edge.id === edgeId) {
            // if edge is not from type create,
            // there is no need for updating the deniedEdgeTypes
            if (edge.type !== "create") {
                return edge;
            }
            edge.data = EdgeDataFactory.edgeDataCreate(
                edge.data,
                // add denied edge types to new create edge data,
                // based on the allowed edge type from nodeDefinition
                deniedEdgeTypes(nodeDefinition)
            );
        }
        return edge;
    });
}

function deniedEdgeTypes(nodeDefinition: NodeDefinition): EdgeTypeIndicator[] {
    return edgeTypeIndicators.filter((edge: EdgeTypeIndicator) => !nodeDefinition.sourceEdgeTypes.includes(edge));
}
