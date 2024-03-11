import { EdgeData, EdgeDataCommon, EdgeDataCreate, EdgeDataEmpty } from "./EdgeData";
import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import { SourceHandleId } from "./SourceHandleId";
import { TargetHandleId } from "./TargetHandleId";
import { EdgeDefinition } from "./EdgeDefinition";
import { EdgeType } from "@pragmatic-programming/ihgraph";

export class EdgeDataFactory {

    static edgeDataEmpty(
        edgeDataCommon: EdgeDataCommon,
    ): EdgeDataEmpty {
        return {
            type: "empty",
            ...edgeDataCommon,
        };
    }

    static edgeDataCreate(
        edgeDataCommon: EdgeDataCommon,
        deniedEdgeTypes: EdgeTypeIndicator[]
    ): EdgeDataCreate {
        return {
            type: "create",
            ...edgeDataCommon,
            deniedEdgeTypes: deniedEdgeTypes,
        };
    }

    static edgeDataCommon(
        edgeDefinition: EdgeDefinition,
        sourceHandle: SourceHandleId,
        targetHandle: TargetHandleId,
    ): EdgeDataCommon {
        return {
            sourceHandle: sourceHandle,
            targetHandle: targetHandle,
            edgePathStyle: "Smooth",
            priority: edgeDefinition.priority,
            immediate: edgeDefinition.immediate,
            bidirectional: edgeDefinition.bidirectional,
        };
    }

    static edgeDataCommonFromEdgeType(
        edgeType: EdgeType,
        sourceHandle: SourceHandleId,
        targetHandle: TargetHandleId,
        bidirectional: boolean,
    ): EdgeDataCommon {
        return {
            sourceHandle: sourceHandle,
            targetHandle: targetHandle,
            edgePathStyle: "Smooth",
            priority: edgeType.getPriority(),
            immediate: edgeType.isImmediate(),
            bidirectional: bidirectional,
        };
    }

    static edgeDataFromEdgeType(
        edgeType: EdgeType,
        sourceHandle: SourceHandleId,
        targetHandle: TargetHandleId,
        bidirectional: boolean,
    ): EdgeData {
        return EdgeDataFactory.edgeDataEmpty(
            EdgeDataFactory.edgeDataCommonFromEdgeType(
                edgeType,
                sourceHandle,
                targetHandle,
                bidirectional
            )
        );
    }

    static edgeDataFromCreationEdge(
        edgeDefinition: EdgeDefinition,
        sourceHandle: SourceHandleId,
        targetHandle: TargetHandleId,
    ): EdgeData {
        const edgeDataCommon: EdgeDataCommon = EdgeDataFactory.edgeDataCommon(edgeDefinition, sourceHandle, targetHandle);
        switch (edgeDefinition.type) {
            case "create":
                return EdgeDataFactory.edgeDataCreate(
                    edgeDataCommon,
                    []
                );
            default:
                return EdgeDataFactory.edgeDataEmpty(
                    edgeDataCommon
                );
        }
    }
}

