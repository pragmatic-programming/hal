import { State } from "../../State";
import { StoreApi } from "zustand";

export function layoutsOpenToggle(setState: StoreApi<State>["setState"]) {
    return () => setState((state: State): State => {
            return {
                ...state,
                ui: {
                    ...state.ui,
                    layouts: {
                        ...state.ui.layouts,
                        open: !state.ui.layouts.open
                    }
                }
            };
        }
    );
}
