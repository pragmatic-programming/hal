import { State } from "../State";
import { StoreApi } from "zustand";
import { EdgePathStyle } from "../../model/edge/EdgePathStyle";
import { Edge } from "reactflow";
import { EdgeData } from "../../model/edge/EdgeData";
import { strictEdge, StrictEdge } from "../../model/edge/StrictEdge";

export function setEdgePathStyleForAll(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (edgePathStyle: EdgePathStyle): Promise<void> => {
        const state: State = getState();
        setState({
            ui: {
                ...state.ui,
                layouts: {
                    ...state.ui.layouts,
                    open: false,
                },
            },
            flow: {
                ...state.flow,
                edges: state.flow.edges.map((edge: Edge<EdgeData>) => {
                    const strict: StrictEdge<EdgeData> = strictEdge(edge);
                    return {
                        ...edge,
                        data: {
                            ...strict.data,
                            edgePathStyle: edgePathStyle,
                        }
                    };
                })
            }
        });
    };
}
