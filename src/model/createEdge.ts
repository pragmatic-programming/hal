import { Edge, MarkerType, OnConnectStartParams } from "reactflow";
import { edgeType, isEdgeType } from "../ui/flow/flow/EdgeTypes";

export const markerEnd = {
    type: MarkerType.ArrowClosed,
    width: 30,
    height: 30,
};

export function createEdgeFromOnConnectStartParams(onConnectStartParams: OnConnectStartParams, targetId: string): Edge {
    if (!onConnectStartParams.nodeId) {
        throw new Error("OnConnectStartParams.nodeId is null");
    }
    if (!onConnectStartParams.handleId) {
        throw new Error("OnConnectStartParams.handleId is null");
    }
    if (!isEdgeType(onConnectStartParams.handleId)) {
        throw new Error("OnConnectStartParams.handleId is not a valid edgeType");
    }
    return createEdge(
        onConnectStartParams.handleId,
        onConnectStartParams.nodeId,
        targetId
    );
}

export function createEdge(edgeType: edgeType, sourceId: string, targetId: string): Edge {
    return edge(sourceId, targetId, edgeType, edgeType, "input");
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
