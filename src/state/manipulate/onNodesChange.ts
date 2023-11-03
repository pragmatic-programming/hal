import { State } from "../State";
import { applyNodeChanges, NodeChange } from "reactflow";
import { StoreApi } from "zustand";

export function onNodesChange(setState: StoreApi<State>["setState"], getState: () => State) {
    return (changes: NodeChange[]) => {
        setState({
            reactFlow: {
                ...getState().reactFlow,
                nodes: applyNodeChanges(changes, getState().reactFlow.nodes),
            }
        });
    };
}
