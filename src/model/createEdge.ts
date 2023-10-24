import EdgeData, { EdgeType } from "./EdgeData";
import { Edge, MarkerType } from "reactflow";

export const markerEnd = {
    type: MarkerType.ArrowClosed,
    width: 30,
    height: 30,
};

export function createEdge(edgeType: string, sourceId: string, targetId: string): Edge<EdgeData> {
    if (edgeType === "sequence") {
        return createSequenceEdge(sourceId, targetId);
    }
    if (edgeType === "execute") {
        return createExecuteEdge(sourceId, targetId);
    }
    throw new Error("Unknown edge type: " + edgeType);
}

export function createSequenceEdge(source: string, target: string): Edge<EdgeData> {
    return edge(source, target, "sequence");
}

export function createExecuteEdge(source: string, target: string): Edge<EdgeData> {
    return edge(source, target, "execute");
}

function edge(source: string, target: string, type: EdgeType): Edge<EdgeData> {
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
