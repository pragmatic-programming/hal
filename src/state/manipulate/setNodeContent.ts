import { State } from "../State";
import { StoreApi } from "zustand";


export function setNodeContent(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (editorId: string, content: string | undefined) => {
        setState({
            nodes: getState().nodes.map(node => {
                if (node.id === editorId) {
                    node.data = {
                        ...node.data,
                        content: content
                    };
                }
                return node;
            })
        });
    };
}
