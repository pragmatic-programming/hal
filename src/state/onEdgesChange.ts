import { State } from "./State";
import { applyEdgeChanges, EdgeChange } from "reactflow";

export function onEdgesChange(setState: (partial: (Partial<State> | ((state: State) => (Partial<State> | State)) | State), replace?: (boolean | undefined)) => void, getState: () => State) {
    return (changes: EdgeChange[]) => {
        setState({
            edges: applyEdgeChanges(changes, getState().edges),
        });
    };
}
