import { State } from "../State";
import { Edge } from "reactflow";
import { StoreApi } from "zustand";
import { ReactFlow } from "../substates/ReactFlow";


export function setEdgeLabel(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (edgeId: string, label: string) => {
        const reactFlow: ReactFlow = getState().reactFlow;
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
