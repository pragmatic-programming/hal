import { State } from "../State";
import { StoreApi } from "zustand";
import { EdgePathStyle } from "../../model/edge/EdgePathStyle";
import { StateFlow } from "./StateFlow";
import { Edge } from "reactflow";
import { strictEdge, StrictEdge } from "../../model/edge/StrictEdge";
import { EdgeData } from "../../model/edge/EdgeData";

export function setEdgePathStyleForEdge(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (edgeId: string, edgePathStyle: EdgePathStyle): Promise<void> => {
        const flow: StateFlow = getState().flow;
        setState({
            flow: {
                ...flow,
                edges: flow.edges.map((edge: Edge<EdgeData>) => {
                    if (edge.id === edgeId) {
                        const strict: StrictEdge<EdgeData> = strictEdge(edge);
                        edge = {
                            ...edge,
                            data: {
                                ...strict.data,
                                edgePathStyle: edgePathStyle,
                            }
                        };
                    }
                    return edge;
                })
            }
        });
    };
}
