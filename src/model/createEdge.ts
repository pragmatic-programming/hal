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
    return edge(source, target, "sequence", "sequence", "input");
}

export function createExecuteEdge(source: string, target: string): Edge {
    return edge(source, target, "execute", "execute", "input");
}

function edge(source: string, target: string, type: string, sourceHandle: string, targetHandle: string): Edge {
    return {
        id: "e" + source + "-" + target,
        source: source,
        target: target,
        sourceHandle: sourceHandle,
        targetHandle: targetHandle,
        label: type,
        type: type,
        markerEnd: markerEnd,
        data: {},
    };
}
