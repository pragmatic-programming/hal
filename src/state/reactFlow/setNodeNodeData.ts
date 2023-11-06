import { State } from "../State";
import { Node } from "reactflow";
import NodeData from "../../model/NodeData";
import { StoreApi } from "zustand";
import { StateReactFlow } from "./StateReactFlow";


export function setNodeNodeData(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (editorId: string, nodeData: Partial<NodeData>) => {
        const reactFlow: StateReactFlow = getState().reactFlow;
        setState({
            reactFlow: {
                ...reactFlow,
                nodes: reactFlow.nodes.map((node: Node<NodeData>) => {
                    if (node.id === editorId) {
                        node.data = {
                            ...node.data,
                            ...nodeData
                        };
                    }
                    return node;
                })
            }
        });
    };
}