import { State } from "./State";
import { applyNodeChanges, NodeChange } from "reactflow";

export function onNodesChange(setState: (partial: (Partial<State> | ((state: State) => (Partial<State> | State)) | State), replace?: (boolean | undefined)) => void, getState: () => State) {
    return (changes: NodeChange[]) => {
        setState({
            nodes: applyNodeChanges(changes, getState().nodes),
        });
    };
}
