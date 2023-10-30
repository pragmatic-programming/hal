import { State } from "../State";
import { StoreApi } from "zustand";

export function setNodeType(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (nodeId: string, type: string) => {
        setState({
            drawerOpen: undefined,
            nodes: getState().nodes.map(node => {
                if (node.id === nodeId) {
                    node.type = type;
                }
                return node;
            })
        });
    };
}
