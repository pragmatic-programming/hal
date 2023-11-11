import { State } from "../State";
import { Node } from "reactflow";
import { NodeData } from "../../model/node/NodeData";
import { StoreApi } from "zustand";
import { StateReactFlow } from "./StateReactFlow";


export function setNodeNodeDataContent(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (editorId: string, content: string | undefined) => {
        const reactFlow: StateReactFlow = getState().reactFlow;
        setState({
            reactFlow: {
                ...reactFlow,
                nodes: reactFlow.nodes.map((node: Node<NodeData>) => {
                    if (node.id === editorId) {
                        if (node.data.type === "create" || node.data.type === "result") {
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
