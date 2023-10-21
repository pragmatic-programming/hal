import EdgeData, { EdgeType } from "./EdgeData";
import { Edge, MarkerType } from "reactflow";

const markerEnd = {
    type: MarkerType.ArrowClosed,
    width: 30,
    height: 30,
};

export function createSequenceEdge(source: string, target: string): Edge<EdgeData> {
    return createEdge(source, target, "sequence");
}

export function createExecuteEdge(source: string, target: string): Edge<EdgeData> {
    return createEdge(source, target, "execute");
}

export function createEdge(source: string, target: string, type: EdgeType): Edge<EdgeData> {
    return {
        id: "e" + source + "-" + target,
        source: source,
        target: target,
        label: type,
        type: type === "sequence" ? "smoothstep" : "",
        markerEnd: markerEnd,
        data: {
            type: type
        },
    };
}
