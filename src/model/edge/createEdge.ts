import { Edge, MarkerType, OnConnectStartParams } from "reactflow";
import { EdgeTypeIndicator, isEdgeTypeIndicator } from "./EdgeTypeIndicator";
import { edgeDefinitionCreate, retrieveEdgeDefinition } from "./edgeDefinitions";
import { EdgeDefinition } from "./EdgeDefinition";
import { EdgeData } from "./EdgeData";
import { createEdgeDataFromCreationEdge } from "./createEdgeData";
import { TransformationEdge } from "../../../../ihgraph";
import { isSourceHandleId, SourceHandleId } from "./SourceHandleId";
import { TargetHandleId } from "./TargetHandleId";

function targetHandleId(sourceHandleId: SourceHandleId): TargetHandleId {
    if (sourceHandleId === "right") {
        return "left";
    }
    return "top";
}

export function createEdgeFromOnConnectStartParams(onConnectStartParams: OnConnectStartParams, targetId: string): Edge {
    if (!onConnectStartParams.nodeId) {
        throw new Error("OnConnectStartParams.nodeId is null");
    }
    const sourceHandleId = onConnectStartParams.handleId;
    if (!isSourceHandleId(sourceHandleId)) {
        throw new Error("OnConnectStartParams.handleId is not from type SourceHandleId");
    }
    return createEdgeFromEdgeType(
        "create",
        onConnectStartParams.nodeId,
        targetId,
        sourceHandleId,
        targetHandleId(sourceHandleId),
    );
}

export function createEdgeFromTransformationEdge(edge: TransformationEdge): Edge {
    const edgeData: EdgeData = edge.getAnnotationData<EdgeData>("edgeData");
    const sourceId = edge.getSourceNode().getId();
    const targetId = edge.getTargetNode().getId();
    const edgeType = edge.getType().getId();
    if (!sourceId) {
        throw new Error("Returned sourceId is undefined");
    }
    if (!targetId) {
        throw new Error("Returned targetId is undefined");
    }
    if (!isEdgeTypeIndicator(edgeType)) {
        throw new Error("EdgeType is not a valid edgeTypeIndicator");
    }
    return createEdgeFromEdgeType(
        edgeType,
        sourceId,
        targetId,
        edgeData.sourceHandle,
        edgeData.targetHandle
    );
}

function createEdgeFromEdgeType(
    edgeType: EdgeTypeIndicator,
    sourceId: string,
    targetId: string,
    sourceHandleId: SourceHandleId,
    targetHandleId: TargetHandleId,
): Edge {
    return createEdgeFromEdgeDefinition(
        retrieveEdgeDefinition(edgeType),
        sourceId,
        targetId,
        sourceHandleId,
        targetHandleId,
    );
}

export function createEdgeCreate(
    sourceId: string,
    targetId: string,
    sourceHandleId: SourceHandleId,
    targetHandleId: TargetHandleId,
): Edge {
    return createEdgeFromEdgeDefinition(edgeDefinitionCreate, sourceId, targetId, sourceHandleId, targetHandleId);
}


export function createEdgeId(sourceId: string, targetId: string, sourceHandleId: string, targetHandleId: string, edgeTypeIndication: EdgeTypeIndicator): string {
    return "e-" + sourceId + "-" + targetId + "-" + sourceHandleId + "-" + targetHandleId + "-" + edgeTypeIndication;
}

export function createEdgeFromEdgeDefinition(
    edgeDefinition: EdgeDefinition,
    sourceId: string,
    targetId: string,
    sourceHandleId: SourceHandleId,
    targetHandleId: TargetHandleId,
): Edge<EdgeData> {
    return {
        id: createEdgeId(sourceId, targetId, sourceHandleId, targetHandleId, edgeDefinition.type),
        source: sourceId,
        target: targetId,
        animated: edgeDefinition.animated,
        sourceHandle: sourceHandleId,
        targetHandle: targetHandleId,
        label: edgeDefinition.type,
        type: edgeDefinition.type,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 30,
            height: 30,
        },
        data: createEdgeDataFromCreationEdge(edgeDefinition.type, sourceHandleId, targetHandleId)
    };
}
