import { Edge, MarkerType, OnConnectStartParams } from "reactflow";
import { EdgeTypeIndicator, isEdgeTypeIndicator } from "./EdgeTypeIndicator";
import { edgeDefinitionCreate, retrieveEdgeDefinition } from "./edgeDefinitions";
import { EdgeDefinition } from "./EdgeDefinition";
import { EdgeData } from "./EdgeData";
import { TransformationEdge } from "ihgraph";
import { isSourceHandleId, SourceHandleId } from "./SourceHandleId";
import { TargetHandleId } from "./TargetHandleId";
import { EdgeDataFactory } from "./EdgeDataFactory";


export class EdgeFactory {

    static fromOnConnectStartParams(onConnectStartParams: OnConnectStartParams, targetId: string): Edge {
        if (!onConnectStartParams.nodeId) {
            throw new Error("OnConnectStartParams.nodeId is null");
        }
        const sourceHandleId = onConnectStartParams.handleId;
        if (!isSourceHandleId(sourceHandleId)) {
            throw new Error("OnConnectStartParams.handleId is not from type SourceHandleId");
        }
        return EdgeFactory.fromEdgeType(
            "create",
            onConnectStartParams.nodeId,
            targetId,
            sourceHandleId,
            EdgeFactory.targetHandleId(sourceHandleId),
        );
    }

    static targetHandleId(sourceHandleId: SourceHandleId): TargetHandleId {
        if (sourceHandleId === "right") {
            return "left";
        }
        return "top";
    }

    static fromTransformationEdge(edge: TransformationEdge): Edge {
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
        return EdgeFactory.fromEdgeType(
            edgeType,
            sourceId,
            targetId,
            edgeData.sourceHandle,
            edgeData.targetHandle
        );
    }

    static fromEdgeType(
        edgeType: EdgeTypeIndicator,
        sourceId: string,
        targetId: string,
        sourceHandleId: SourceHandleId,
        targetHandleId: TargetHandleId,
    ): Edge {
        return EdgeFactory.fromEdgeDefinition(
            retrieveEdgeDefinition(edgeType),
            sourceId,
            targetId,
            sourceHandleId,
            targetHandleId,
        );
    }

    static edgeCreate(
        sourceId: string,
        targetId: string,
        sourceHandleId: SourceHandleId,
        targetHandleId: TargetHandleId,
    ): Edge {
        return EdgeFactory.fromEdgeDefinition(edgeDefinitionCreate, sourceId, targetId, sourceHandleId, targetHandleId);
    }


    static edgeId(sourceId: string, targetId: string, sourceHandleId: string, targetHandleId: string, edgeTypeIndication: EdgeTypeIndicator): string {
        return "e-" + sourceId + "-" + targetId + "-" + sourceHandleId + "-" + targetHandleId + "-" + edgeTypeIndication;
    }

    static fromEdgeDefinition(
        edgeDefinition: EdgeDefinition,
        sourceId: string,
        targetId: string,
        sourceHandleId: SourceHandleId,
        targetHandleId: TargetHandleId,
    ): Edge<EdgeData> {
        return {
            id: EdgeFactory.edgeId(sourceId, targetId, sourceHandleId, targetHandleId, edgeDefinition.type),
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
            data: EdgeDataFactory.edgeDataFromCreationEdge(edgeDefinition.type, sourceHandleId, targetHandleId)
        };
    }
}

