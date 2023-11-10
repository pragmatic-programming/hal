import { State } from "../State";
import { Node } from "reactflow";
import { NodeData } from "../../model/node/NodeData";
import { StoreApi } from "zustand";
import { StateReactFlow } from "./StateReactFlow";
import { LanguageIndicator } from "../../model/node/LanguageIndicator";


export function setNodeNodeDataLanguage(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (editorId: string, language: LanguageIndicator) => {
        const reactFlow: StateReactFlow = getState().reactFlow;
        setState({
            reactFlow: {
                ...reactFlow,
                nodes: reactFlow.nodes.map((node: Node<NodeData>) => {
                    if (node.id === editorId) {
                        if (node.data.type !== "editor") {
                            throw new Error("Node has wrong type");
                        }
                        node.data.language = language;
                    }
                    return node;
                })
            }
        });
    };
}
