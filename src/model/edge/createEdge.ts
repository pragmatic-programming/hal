import { Edge, MarkerType, OnConnectStartParams } from "reactflow";
import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import { edgeDefinitionCreate, retrieveEdgeDefinition } from "./edgeDefinitions";
import { EdgeDefinition } from "./EdgeDefinition";

export function createEdgeFromOnConnectStartParams(onConnectStartParams: OnConnectStartParams, targetId: string): Edge {
    if (!onConnectStartParams.nodeId) {
        throw new Error("OnConnectStartParams.nodeId is null");
    }
    if (!onConnectStartParams.handleId) {
        throw new Error("OnConnectStartParams.handleId is null");
    }
    // todo
    return createEdgeFromEdgeType(
        "create",
        onConnectStartParams.nodeId,
        targetId
    );
}

export function createEdgeFromEdgeType(edgeType: EdgeTypeIndicator, sourceId: string, targetId: string): Edge {
    return createEdgeFromEdgeDefinition(
        retrieveEdgeDefinition(edgeType),
        sourceId,
        targetId
    );
}

export function createEdgeCreate(
    sourceId: string,
    targetId: string,
) {
    return createEdgeFromEdgeDefinition(edgeDefinitionCreate, sourceId, targetId);
}


export function createEdgeId(sourceId: string, targetId: string, edgeTypeIndication: EdgeTypeIndicator) {
    return "e" + sourceId + "-" + targetId + "-" + edgeTypeIndication;
}

function createEdgeFromEdgeDefinition(
    edgeDefinition: EdgeDefinition,
    sourceId: string,
    targetId: string,
): Edge {
    return {
        id: createEdgeId(sourceId, targetId, edgeDefinition.type),
        source: sourceId,
        target: targetId,
        animated: edgeDefinition.animated,
        sourceHandle: edgeDefinition.type,
        targetHandle: "input",
        label: edgeDefinition.type,
        type: edgeDefinition.type,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 30,
            height: 30,
        },
        data: {}
    };
}
