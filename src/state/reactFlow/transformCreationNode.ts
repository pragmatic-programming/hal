import { State } from "../State";
import { StoreApi } from "zustand";
import { createNodeDataFromCreationNode } from "../../model/node/createNodeData";
import { NodeTypeIndicator } from "../../model/node/NodeTypeIndicator";

export function transformCreationNode(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (nodeId: string, type: NodeTypeIndicator) => {
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
                        const data = createNodeDataFromCreationNode(type);
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
