import { State } from "../State";
import { Edge } from "reactflow";
import { StoreApi } from "zustand";
import { StateFlow } from "./StateFlow";


export function setEdgePriority(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (edgeId: string, priority: number): Promise<void> => {
        const reactFlow: StateFlow = getState().flow;
        setState({
            flow: {
                ...reactFlow,
                // todo use EdgeData?
                edges: reactFlow.edges.map((edge: Edge) => {
                    if (edge.id === edgeId) {
                        edge = {
                            ...edge,
                            data: {
                                ...edge.data,
                                priority: priority,
                            }
                        };
                    }
                    return edge;
                })
            }
        });
    };
}
