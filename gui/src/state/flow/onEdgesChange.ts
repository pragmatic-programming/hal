import { State } from "../State";
import { applyEdgeChanges, EdgeChange } from "reactflow";
import { StoreApi } from "zustand";

export function onEdgesChange(setState: StoreApi<State>["setState"], getState: () => State) {
    return (changes: EdgeChange[]): void => {
        setState({
            flow: {
                ...getState().flow,
                edges: applyEdgeChanges(changes, getState().flow.edges),
            }
        });
    };
}
