import { State } from "../../State";
import { StoreApi } from "zustand";

export function compilationsOpenToggle(setState: StoreApi<State>["setState"]) {
    return () => setState((state: State): State => {
            return {
                ...state,
                ui: {
                    ...state.ui,
                    compilations: {
                        ...state.ui.compilations,
                        open: !state.ui.compilations.open
                    }
                }
            };
        }
    );
}
