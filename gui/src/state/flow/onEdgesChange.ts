import { State } from "../State";
import { applyEdgeChanges, EdgeChange } from "reactflow";
import { StoreApi } from "zustand";

export function onEdgesChange(setState: StoreApi<State>["setState"], getState: () => State) {
    return (changes: EdgeChange[]): void => {
        setState({
            reactFlow: {
                ...getState().reactFlow,
                edges: applyEdgeChanges(changes, getState().reactFlow.edges),
            }
        });
    };
}
