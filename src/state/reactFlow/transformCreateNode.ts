import { State } from "../State";
import { StoreApi } from "zustand";
import { NodeTypeIndicator } from "../../model/node/NodeTypeIndicator";
import { Node } from "reactflow";
import { StateReactFlow } from "./StateReactFlow";
import { NodeData } from "../../model/node/NodeData";
import { createNodeDataFromCreationNode } from "../../model/node/createNodeData";


export function transformCreateNode(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (nodeId: string, type: NodeTypeIndicator): Promise<void> => {
        const reactFlow: StateReactFlow = getState().reactFlow;
        setState({
            reactFlow: {
                ...reactFlow,
                nodes: transformNodes(reactFlow, nodeId, type)
            }
        });
    };
}

// todo function name
export function transformNodes(reactFlow: StateReactFlow, nodeId: string, type: NodeTypeIndicator): Node[] {
    return reactFlow.nodes.map((node: Node) => {
        if (node.id === nodeId) {
            node.type = type;
            if (node.data.type !== "create") {
                throw new Error("Node is not from typ create");
            }
            const data: NodeData = createNodeDataFromCreationNode(type);
            node.data = data;
            node.height = data.height;
            node.width = data.width;
        }
        return node;
    });
}
