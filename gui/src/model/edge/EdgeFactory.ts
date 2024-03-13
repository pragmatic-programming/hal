import { Edge, EdgeMarkerType, MarkerType, OnConnectStartParams } from "reactflow";
import { edgeDefinitionCreate } from "./edgeDefinitions";
import { EdgeDefinition } from "./EdgeDefinition";
import { EdgeData, EdgeDataCreate } from "./EdgeData";
import { EdgeType, TransformationEdge } from "@pragmatic-programming/ihgraph";
import { isSourceHandleId, SourceHandleId } from "./SourceHandleId";
import { isTargetHandleId, TargetHandleId } from "./TargetHandleId";
import { EdgeDataFactory } from "./EdgeDataFactory";
import { EdgeTypeIndicator, isEdgeTypeIndicator } from "./EdgeTypeIndicator";
import { FlowToIHGraphProcessor } from "../../processors/FlowToIHGraphProcessor";


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
        const sourceId: string = edge.getSourceNode().getId();
        const targetId: string = edge.getTargetNode().getId();
        if (!sourceId) {
            throw new Error("Returned sourceId is undefined");
        }
        if (!targetId) {
            throw new Error("Returned targetId is undefined");
        }
        let edgeData: EdgeData = EdgeDataFactory.default();
        if (edge.hasAnnotation(FlowToIHGraphProcessor.ANNOTATION_EDGE_DATA)) {
            edgeData = edge.getAnnotationData(FlowToIHGraphProcessor.ANNOTATION_EDGE_DATA);
        }
        return EdgeFactory.fromEdgeTypeAndEdgeData(
            edge.getType(),
            edgeData,
            sourceId,
            targetId,
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

    private static targetHandleId(sourceHandleId: SourceHandleId): TargetHandleId {
        if (sourceHandleId === "right") {
            return "left";
        }
        return "top";
    }

    private static fromEdgeTypeAndEdgeData(
        edgeType: EdgeType,
        edgeData: EdgeData,
        sourceId: string,
        targetId: string,
    ): Edge<EdgeData> {
        return EdgeFactory.edge(
            EdgeFactory.edgeId(
                sourceId,
                targetId,
                edgeData.sourceHandle,
                edgeData.targetHandle,
                edgeType.getId()
            ),
            sourceId,
            targetId,
            edgeData.sourceHandle,
            edgeData.targetHandle,
            edgeType.isImmediate(),
            edgeData.bidirectional,
            EdgeFactory.edgeTypeIndicator(edgeType),
            edgeType.getId(),
            edgeData,
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
            EdgeFactory.edgeId(
                sourceId,
                targetId,
                sourceHandleId,
                targetHandleId,
                edgeDefinition.type
            ),
            sourceId,
            targetId,
            sourceHandleId,
            targetHandleId,
            edgeDefinition.animated,
            edgeDefinition.bidirectional,
            edgeDefinition.type,
            edgeDefinition.type,
            EdgeDataFactory.edgeDataFromCreationEdge(
                edgeDefinition,
                sourceHandleId,
                targetHandleId,
            )
        );
    }

    private static edge(
        id: string,
        sourceId: string,
        targetId: string,
        sourceHandleId: string,
        targetHandleId: string,
        animated: boolean,
        bidirectional: boolean,
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
            markerEnd: EdgeFactory.marker(bidirectional),
            data: data
        };
    }

    private static marker(bidirectional: boolean): EdgeMarkerType | undefined {
        if (bidirectional) {
            return undefined;
        }
        return {
            type: MarkerType.ArrowClosed,
            width: 30,
            height: 30,
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
