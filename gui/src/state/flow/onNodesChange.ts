import { State } from "../State";
import { applyNodeChanges, NodeChange } from "reactflow";
import { StoreApi } from "zustand";

export function onNodesChange(setState: StoreApi<State>["setState"], getState: () => State) {
    return (changes: NodeChange[]): void => {
        setState({
            flow: {
                ...getState().flow,
                nodes: applyNodeChanges(changes, getState().flow.nodes),
            }
        });
    };
}
