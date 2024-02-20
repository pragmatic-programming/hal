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
        sourceHandle: SourceHandleId,
        targetHandle: TargetHandleId,
        priority: number,
    ): EdgeDataCommon {
        return {
            edgePathStyle: "Smooth",
            priority: priority,
            sourceHandle: sourceHandle,
            targetHandle: targetHandle,
        };
    }

    static edgeDataFromCreationEdge(
        edgeDefinition: EdgeDefinition,
        sourceHandle: SourceHandleId,
        targetHandle: TargetHandleId,
    ): EdgeData {
        const edgeDataCommon: EdgeDataCommon = EdgeDataFactory.edgeDataCommon(sourceHandle, targetHandle, edgeDefinition.priority);
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

