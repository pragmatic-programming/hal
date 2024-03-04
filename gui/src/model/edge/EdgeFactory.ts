import { Edge, MarkerType, OnConnectStartParams } from "reactflow";
import { edgeDefinitionCreate } from "./edgeDefinitions";
import { EdgeDefinition } from "./EdgeDefinition";
import { EdgeData, EdgeDataCreate } from "./EdgeData";
import { EdgeType, TransformationEdge } from "@pragmatic-programming/ihgraph";
import { isSourceHandleId, SourceHandleId } from "./SourceHandleId";
import { isTargetHandleId, TargetHandleId } from "./TargetHandleId";
import { EdgeDataFactory } from "./EdgeDataFactory";
import { EdgeTypeIndicator, isEdgeTypeIndicator } from "./EdgeTypeIndicator";


export class EdgeFactory {

    static fromCreationEdge(edge: Edge<EdgeDataCreate>, edgeDefinition: EdgeDefinition): Edge<EdgeData> {
        if (!isSourceHandleId(edge.sourceHandle)) {
            throw new Error("edge.sourceHandle is not from type SourceHandleId");
        }
        if (!isTargetHandleId(edge.targetHandle)) {
            throw new Error("edge.targetHandle is not from type TargetHandleId");
        }
        return EdgeFactory.fromEdgeDefinition(
            edgeDefinition,
            edge.source,
            edge.target,
            edge.sourceHandle,
            edge.targetHandle,
        );
    }

    static fromOnConnectStartParams(onConnectStartParams: OnConnectStartParams, targetId: string): Edge {
        if (!onConnectStartParams.nodeId) {
            throw new Error("OnConnectStartParams.nodeId is null");
        }
        const sourceHandleId = onConnectStartParams.handleId;
        if (!isSourceHandleId(sourceHandleId)) {
            throw new Error("OnConnectStartParams.handleId is not from type SourceHandleId");
        }
        return EdgeFactory.edgeCreate(
            onConnectStartParams.nodeId,
            targetId,
            sourceHandleId,
            EdgeFactory.targetHandleId(sourceHandleId),
        );
    }

    static fromTransformationEdge(edge: TransformationEdge): Edge {
        const sourceId = edge.getSourceNode().getId();
        const targetId = edge.getTargetNode().getId();
        const edgeType = edge.getType();
        if (!sourceId) {
            throw new Error("Returned sourceId is undefined");
        }
        if (!targetId) {
            throw new Error("Returned targetId is undefined");
        }
        return EdgeFactory.fromEdgeType(edgeType, sourceId, targetId);
    }

    static edgeCreate(
        sourceId: string,
        targetId: string,
        sourceHandleId: SourceHandleId,
        targetHandleId: TargetHandleId,
    ): Edge {
        return EdgeFactory.fromEdgeDefinition(edgeDefinitionCreate, sourceId, targetId, sourceHandleId, targetHandleId);
    }

    private static targetHandleId(sourceHandleId: SourceHandleId): TargetHandleId {
        if (sourceHandleId === "right") {
            return "left";
        }
        return "top";
    }

    private static fromEdgeType(
        edgeType: EdgeType,
        sourceId: string,
        targetId: string,
    ): Edge<EdgeData> {
        const sourceHandleId: SourceHandleId = "right";
        const targetHandleId: TargetHandleId = "left";
        return EdgeFactory.edge(
            EdgeFactory.edgeId(sourceId, targetId, sourceHandleId, targetHandleId, edgeType.getId()),
            sourceId,
            targetId,
            sourceHandleId,
            targetHandleId,
            edgeType.isImmediate(),
            EdgeFactory.edgeTypeIndicator(edgeType),
            edgeType.getId(),
            EdgeDataFactory.edgeDataFromEdgeType(edgeType, sourceHandleId, targetHandleId)
        );
    }

    private static fromEdgeDefinition(
        edgeDefinition: EdgeDefinition,
        sourceId: string,
        targetId: string,
        sourceHandleId: SourceHandleId,
        targetHandleId: TargetHandleId,
    ): Edge<EdgeData> {
        return EdgeFactory.edge(
            EdgeFactory.edgeId(sourceId, targetId, sourceHandleId, targetHandleId, edgeDefinition.type),
            sourceId,
            targetId,
            sourceHandleId,
            targetHandleId,
            edgeDefinition.animated,
            edgeDefinition.type,
            edgeDefinition.type,
            EdgeDataFactory.edgeDataFromCreationEdge(edgeDefinition, sourceHandleId, targetHandleId)
        );
    }

    private static edge(
        id: string,
        sourceId: string,
        targetId: string,
        sourceHandleId: string,
        targetHandleId: string,
        animated: boolean,
        type: EdgeTypeIndicator,
        label: string,
        data: EdgeData,
    ): Edge<EdgeData> {
        return {
            id: id,
            source: sourceId,
            target: targetId,
            animated: animated,
            sourceHandle: sourceHandleId,
            targetHandle: targetHandleId,
            label: label,
            type: type,
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 30,
                height: 30,
            },
            data: data
        };
    }

    private static edgeId(sourceId: string, targetId: string, sourceHandleId: string, targetHandleId: string, edgeTypeIndication: string): string {
        return "e-" + sourceId + "-" + targetId + "-" + sourceHandleId + "-" + targetHandleId + "-" + edgeTypeIndication;
    }

    private static edgeTypeIndicator(edgeType: EdgeType): EdgeTypeIndicator {
        const id: string | EdgeTypeIndicator = edgeType.getId();
        if (!isEdgeTypeIndicator(id)) {
            // if edgeType is not a valid indicator,
            // we create an unknown edge so that the
            // graph can still be rendered
            return "prototype";
        }
        return id;
    }
}

