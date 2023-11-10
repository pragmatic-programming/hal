import { State } from "../State";
import { StoreApi } from "zustand";
import { nodeType } from "../../model/NodeTypes";
import { createNodeDataFromCreationNode } from "../../model/createNodeData";

export function transformCreationNode(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (nodeId: string, type: nodeType) => {
        const reactFlow = getState().reactFlow;
        setState({
            dialog: {
                ...getState().dialog,
                open: undefined
            },
            reactFlow: {
                ...reactFlow,
                nodes: reactFlow.nodes.map(node => {
                    if (node.id === nodeId) {
                        node.type = type;
                        if (node.data.type !== "creation") {
                            throw new Error("Node is not from typ creation");
                        }
                        const data = createNodeDataFromCreationNode(node.data, type);
                        node.data = data;
                        node.height = data.height;
                        node.width = data.width;
                    }
                    return node;
                })
            }
        });
    };
}
