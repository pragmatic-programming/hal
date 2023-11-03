import { State } from "../State";
import { StoreApi } from "zustand";
import { EdgePathStyle } from "./EdgePathStyle";

export function setEdgePathStyle(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (edgePathStyle: EdgePathStyle) => {
        setState({
            reactFlow: {
                ...getState().reactFlow,
                edgePathStyle: edgePathStyle,
            }
        });
    };
}
