import { Edge } from "reactflow";
import { EdgeTypeIndicator, isEdgeTypeIndicator } from "./EdgeTypeIndicator";

export type StrictEdge<T> = Edge<T> & {
    type: EdgeTypeIndicator;
    data: T;
}

export function strictEdge<T>(edge: Edge<T> | undefined): StrictEdge<T> {
    if (!edge) {
        throw new Error("Edge is undefined");
    }
    if (!edge.type) {
        throw new Error("Edge.type is undefined");
    }
    if (!isEdgeTypeIndicator(edge.type)) {
        throw new Error("EdgeType is not a valid edgeTypeIndicator");
    }
    if (!edge.data) {
        throw new Error("Edge.data is undefined");
    }
    return edge as StrictEdge<T>;
}
