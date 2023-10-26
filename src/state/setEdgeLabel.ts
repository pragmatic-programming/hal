import { State } from "./State";
import { Edge } from "reactflow";


export function setEdgeLabel(getState: () => State, setState: (partial: (Partial<State> | ((state: State) => (Partial<State> | State)) | State), replace?: (boolean | undefined)) => void) {
    return async (edgeId: string, label: string) => {
        setState({
            edges: getState().edges.map((edge: Edge) => {
                if (edge.id === edgeId) {
                    edge = {
                        ...edge,
                        label: label,
                    };
                }
                return edge;
            })
        });
    };
}
