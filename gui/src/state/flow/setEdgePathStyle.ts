import { State } from "../State";
import { StoreApi } from "zustand";
import { EdgePathStyle } from "../../model/edge/EdgePathStyle";

export function setEdgePathStyle(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (edgePathStyle: EdgePathStyle): Promise<void> => {
        const state: State = getState();
        setState({
            ui: {
                ...state.ui,
                layouts: {
                    ...state.ui.layouts,
                    open: false,
                },
            },
            flow: {
                ...state.flow,
                edgePathStyle: edgePathStyle,
            },
        });
    };
}
