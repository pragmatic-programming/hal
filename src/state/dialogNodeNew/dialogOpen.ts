import { State } from "../State";
import { StoreApi } from "zustand";

export function dialogOpen(setState: StoreApi<State>["setState"]) {
    return (nodeId: string | undefined) => setState((state: State): State => {
        if (nodeId) {
            return {
                ...state,
                dialog: {
                    ...state.dialog,
                    open: {
                        nodeId: nodeId,
                    }
                }
            };
        }
        return {
            ...state,
            dialog: {
                ...state.dialog,
                open: undefined,
            }
        };
    });
}
