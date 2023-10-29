import { State } from "./State";
import { Node } from "reactflow";
import NodeData from "../model/NodeData";
import { StoreApi } from "zustand";


export function setNodeLabel(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (editorId: string, label: string) => {
        setState({
            nodes: getState().nodes.map((node: Node<NodeData>) => {
                if (node.id === editorId) {
                    node.data = {
                        ...node.data,
                        label: label
                    };
                }
                return node;
            })
        });
    };
}
