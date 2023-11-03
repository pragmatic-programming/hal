import { State } from "../State";
import { StoreApi } from "zustand";
import { EdgePathStyle } from "../EdgePathStyle";

export function setEdgePathStyle(setState: StoreApi<State>["setState"]) {
    return async (edgePathStyle: EdgePathStyle) => {
        setState({
            edgePathStyle: edgePathStyle
        });
    };
}
