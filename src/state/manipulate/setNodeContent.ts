import { State } from "../State";
import { StoreApi } from "zustand";

export function setNodeContent(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (nodeId: string, content: string | undefined) => {
        setState({
            nodes: getState().nodes.map(node => {
                if (node.id === nodeId) {
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
