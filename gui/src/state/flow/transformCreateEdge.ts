import { State } from "../State";
import { StoreApi } from "zustand";
import { Edge, Node } from "reactflow";
import { EdgeDefinition } from "../../model/edge/EdgeDefinition";
import { StateFlow } from "./StateFlow";
import { NodeTypeIndicator } from "../../model/node/NodeTypeIndicator";
import { NodeFactory } from "../../model/node/NodeFactory";
import { EdgeFactory } from "../../model/edge/EdgeFactory";


export function transformCreateEdge(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (edgeId: string, edgeDefinition: EdgeDefinition, targetNodeId: string): Promise<void> => {
        const reactFlow: StateFlow = getState().flow;
        const edges: Edge[] = transformEdges(reactFlow, edgeDefinition, edgeId);
        let nodes: Node[] = reactFlow.nodes;
        // if only one targetNodeType exist,
        // we can transform the target node
        if (edgeDefinition.targetNodeTypes.length === 1) {
            const firstTargetNodeType: NodeTypeIndicator = edgeDefinition.targetNodeTypes[0];
            nodes = transformNodes(reactFlow, firstTargetNodeType, targetNodeId);
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


function transformNodes(reactFlow: StateFlow, type: NodeTypeIndicator, nodeId: string): Node[] {
    return reactFlow.nodes.map((node: Node) => {
        if (node.id === nodeId) {
            if (node.type === "create") {
                node = NodeFactory.fromCreationNode(node, type);
            }
        }
        return node;
    });
}


function transformEdges(reactFlow: StateFlow, edgeDefinition: EdgeDefinition, edgeId: string): Edge[] {
    return reactFlow.edges.map((edge: Edge) => {
        if (edge.id === edgeId) {
            edge = EdgeFactory.fromCreationEdge(edge, edgeDefinition);
        }
        return edge;
    });
}

