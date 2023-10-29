import { State } from "./State";
import { StoreApi } from "zustand";

export function toggleDrawer(setState: StoreApi<State>["setState"]) {
    return () => setState((state: State): State => ({
        ...state,
        drawerOpen: !state.drawerOpen
    }));
}
