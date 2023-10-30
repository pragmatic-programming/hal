import { State } from "../State";
import { StoreApi } from "zustand";

export function openNewDialog(setState: StoreApi<State>["setState"]) {
    return (nodeId: string | undefined) => setState((state: State): State => {
        if (nodeId) {
            return {
                ...state,
                newNodeDialogOpen: {
                    nodeId: nodeId,
                }
            };
        }
        return {
            ...state,
            newNodeDialogOpen: undefined
        };
    });
}
