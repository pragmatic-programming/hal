import { State } from "../State";
import { Node } from "reactflow";
import NodeData from "../../model/NodeData";
import { StoreApi } from "zustand";
import { Language } from "../../model/Languages";


export function setNodeLanguage(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (editorId: string, language: Language) => {
        setState({
            nodes: getState().nodes.map((node: Node<NodeData>) => {
                if (node.id === editorId) {
                    node.data = {
                        ...node.data,
                        language: language
                    };
                }
                return node;
            })
        });
    };
}
