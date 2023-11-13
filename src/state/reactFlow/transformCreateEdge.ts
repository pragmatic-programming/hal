import { State } from "../State";
import { StoreApi } from "zustand";
import { createEdgeId } from "../../model/edge/createEdge";
import { Edge, Node } from "reactflow";
import { EdgeDefinition } from "../../model/edge/EdgeDefinition";
import { StateReactFlow } from "./StateReactFlow";
import { NodeTypeIndicator } from "../../model/node/NodeTypeIndicator";
import { transformNodes } from "./transformCreateNode";


export function transformCreateEdge(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (edgeId: string, edgeDefinition: EdgeDefinition, targetNodeId: string): Promise<void> => {
        const reactFlow: StateReactFlow = getState().reactFlow;
        const edges: Edge[] = transformEdges(reactFlow, edgeDefinition, edgeId);
        let nodes: Node[] = reactFlow.nodes;
        // if only one targetNodeType exist,
        // we can transform the target node
        if (edgeDefinition.targetNodeTypes.length === 1) {
            const firstTargetNodeType: NodeTypeIndicator = edgeDefinition.targetNodeTypes[0];
            nodes = transformNodes(reactFlow, firstTargetNodeType, targetNodeId);
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

// todo function name
function transformEdges(reactFlow: StateReactFlow, edgeDefinition: EdgeDefinition, edgeId: string): Edge[] {
    return reactFlow.edges.map((edge: Edge) => {
        if (edge.id === edgeId) {
            if (edge.type !== "create") {
                throw new Error("Edge is not from typ create");
            }
            edge.id = createEdgeId(edge.source, edge.target, edgeDefinition.type);
            edge.type = edgeDefinition.type;
            edge.animated = edgeDefinition.animated;
            edge.label = edgeDefinition.type;
        }
        return edge;
    });
}
