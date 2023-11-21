import { State } from "../State";
import { Node } from "reactflow";
import { NodeData } from "../../model/node/NodeData";
import { StoreApi } from "zustand";
import { StateFlow } from "./StateFlow";


export function setNodeNodeDataContent(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (editorId: string, content: string | undefined): Promise<void> => {
        const reactFlow: StateFlow = getState().flow;
        setState({
            flow: {
                ...reactFlow,
                nodes: reactFlow.nodes.map((node: Node<NodeData>) => {
                    if (node.id === editorId) {
                        if (node.data.type === "create") {
                            throw new Error("Node has wrong type");
                        }
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                content: content,
                            }
                        };
                    }
                    return node;
                })
            }
        });
    };
}
