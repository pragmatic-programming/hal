import { State } from "../State";
import { StoreApi } from "zustand";

export function toggleDrawer(setState: StoreApi<State>["setState"]) {
    return (nodeId: string | undefined) => setState((state: State): State => {
        if (nodeId) {
            return {
                ...state,
                drawerOpen: {
                    nodeId: nodeId,
                }
            };
        }
        return {
            ...state,
            drawerOpen: undefined
        };
    });
}
