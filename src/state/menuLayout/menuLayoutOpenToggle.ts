import { State } from "../State";
import { StoreApi } from "zustand";

export function menuLayoutOpenToggle(setState: StoreApi<State>["setState"]) {
    return () => setState((state: State): State => {
            return {
                ...state,
                menuLayout: {
                    ...state.menuLayout,
                    open: !state.menuLayout.open
                }
            };
        }
    );
}
