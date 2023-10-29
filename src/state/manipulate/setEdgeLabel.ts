import { State } from "../State";
import { Edge } from "reactflow";
import { StoreApi } from "zustand";


export function setEdgeLabel(setState: StoreApi<State>["setState"], getState: () => State) {
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
