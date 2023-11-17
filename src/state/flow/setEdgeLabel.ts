import { State } from "../State";
import { Edge } from "reactflow";
import { StoreApi } from "zustand";
import { StateFlow } from "./StateFlow";


export function setEdgeLabel(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (edgeId: string, label: string): Promise<void> => {
        const reactFlow: StateFlow = getState().reactFlow;
        setState({
            reactFlow: {
                ...reactFlow,
                edges: reactFlow.edges.map((edge: Edge) => {
                    if (edge.id === edgeId) {
                        edge = {
                            ...edge,
                            label: label,
                        };
                    }
                    return edge;
                })
            }
        });
    };
}
