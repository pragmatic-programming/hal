import { State } from "../State";
import { StoreApi } from "zustand";

export function setConnectingSource(setState: StoreApi<State>["setState"]) {
    return (handleId: "right" | "bottom" | null, nodeId: string | null) => setState((state: State): State => ({
        ...state,
        flow: {
            ...state.flow,
            connectingSourceNodeId: nodeId,
            connectingSourceHandleId: handleId,
        }
    }));
}
