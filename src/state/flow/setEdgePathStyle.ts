import { State } from "../State";
import { StoreApi } from "zustand";
import { EdgePathStyle } from "../../model/edge/EdgePathStyle";

export function setEdgePathStyle(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (edgePathStyle: EdgePathStyle): Promise<void> => {
        const state = getState();
        setState({
            menuLayout: {
                ...state.menuLayout,
                open: false,
            },
            reactFlow: {
                ...state.reactFlow,
                edgePathStyle: edgePathStyle,
            },
        });
    };
}
