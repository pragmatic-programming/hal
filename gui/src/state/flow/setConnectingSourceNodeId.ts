import { State } from "../State";
import { StoreApi } from "zustand";

export function setConnectingSourceNodeId(setState: StoreApi<State>["setState"]) {
    return (nodeId: string | null) => setState((state: State): State => ({
        ...state,
        flow: {
            ...state.flow,
            connectingSourceNodeId: nodeId,
        }
    }));
}
