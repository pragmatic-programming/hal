import { Edge, MarkerType } from "reactflow";

export const markerEnd = {
    type: MarkerType.ArrowClosed,
    width: 30,
    height: 30,
};

export const validEdgeTypes: string[] = ["sequence", "execute"];

export function createEdge(edgeType: string, sourceId: string, targetId: string): Edge {
    if (edgeType === "sequence") {
        return createSequenceEdge(sourceId, targetId);
    }
    if (edgeType === "execute") {
        return createExecuteEdge(sourceId, targetId);
    }
    throw new Error("Unknown edge type: " + edgeType);
}

export function createSequenceEdge(source: string, target: string): Edge {
    return edge(source, target, "sequence");
}

export function createExecuteEdge(source: string, target: string): Edge {
    return edge(source, target, "execute");
}

function edge(source: string, target: string, type: string): Edge {
    return {
        id: "e" + source + "-" + target,
        source: source,
        target: target,
        label: type,
        type: type,
        markerEnd: markerEnd,
        data: {},
    };
}
