import { EdgeData, EdgeDataCommon, EdgeDataCreate, EdgeDataEmpty } from "./EdgeData";
import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import { SourceHandleId } from "./SourceHandleId";
import { TargetHandleId } from "./TargetHandleId";
import { EdgeDefinition } from "./EdgeDefinition";

export class EdgeDataFactory {
    static edgeDataEmpty(
        edgeDataCommon: EdgeDataCommon,
    ): EdgeDataEmpty {
        return {
            type: "empty",
            ...edgeDataCommon,
        };
    }

    static default(): EdgeData {
        return {
            type: "empty",
            bidirectional: false,
            edgePathStyle: "Smooth",
            immediate: false,
            priority: 1,
            sourceHandle: "bottom",
            targetHandle: "left",
            description: "",
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
            description: "",
        };
    }

    static edgeDataFromCreationEdge(
        edgeDefinition: EdgeDefinition,
        sourceHandle: SourceHandleId,
        targetHandle: TargetHandleId,
    ): EdgeData {
        const edgeDataCommon: EdgeDataCommon = EdgeDataFactory.edgeDataCommon(
            edgeDefinition,
            sourceHandle,
            targetHandle,
        );
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

