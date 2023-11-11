import { State } from "../State";
import { StoreApi } from "zustand";
import { EdgeTypeIndicator } from "../../model/edge/EdgeTypeIndicator";
import { createEdgeId } from "../../model/edge/createEdge";
import { Edge } from "reactflow";

export function transformCreateEdge(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (edgeId: string, type: EdgeTypeIndicator) => {
        const reactFlow = getState().reactFlow;
        setState({
            reactFlow: {
                ...reactFlow,
                edges: reactFlow.edges.map((edge: Edge) => {
                    if (edge.id === edgeId) {
                        if (edge.type !== "create") {
                            throw new Error("Edge is not from typ create");
                        }
                        edge.id = createEdgeId(edge.source, edge.target, type);
                        edge.type = type;
                        edge.label = type;
                    }
                    return edge;
                })
            }
        });
    };
}
