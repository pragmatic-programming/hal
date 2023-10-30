import { Edge, MarkerType, OnConnectStartParams } from "reactflow";
import { edgeType } from "../ui/flow/flow/EdgeTypes";

export const markerEnd = {
    type: MarkerType.ArrowClosed,
    width: 30,
    height: 30,
};

export const validEdgeTypes: string[] = ["sequence", "execute"];

export function createEdgeFromOnConnectStartParams(onConnectStartParams: OnConnectStartParams, targetId: string): Edge {
    if (!onConnectStartParams.nodeId) {
        throw new Error("ConnectingNodeId.current.nodeId is null");
    }
    if (!onConnectStartParams.handleId) {
        throw new Error("ConnectingNodeId.current.handle is null");
    }
    return createEdge(
        onConnectStartParams.handleId,
        onConnectStartParams.nodeId,
        targetId
    );
}

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

function edge(source: string, target: string, type: edgeType, sourceHandle: string, targetHandle: string): Edge {
    return {
        id: "e" + source + "-" + target + "-" + type,
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
