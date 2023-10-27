import { State } from "./State";

export function toggleDrawer( setState: (partial: (Partial<State> | ((state: State) => (Partial<State> | State)) | State), replace?: (boolean | undefined)) => void) {
    return () => setState((state: State): State => ({
        ...state,
        drawerOpen: !state.drawerOpen
    }))
}
