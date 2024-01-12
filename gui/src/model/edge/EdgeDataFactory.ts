import { EdgeData, EdgeDataCommon, EdgeDataCreate, EdgeDataEmpty } from "./EdgeData";
import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import { SourceHandleId } from "./SourceHandleId";
import { TargetHandleId } from "./TargetHandleId";

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
        immediate: boolean,
    ): EdgeDataCommon {
        return {
            sourceHandle: sourceHandle,
            targetHandle: targetHandle,
            edgePathStyle: "Smooth",
            priority: priority,
            immediate: immediate
        };
    }

    static edgeDataFromCreationEdge(
        newEdgeDataTypeIdentifier: string,
        sourceHandle: SourceHandleId,
        targetHandle: TargetHandleId,
        priority: number,
        immediate: boolean
    ): EdgeData {
        const edgeDataCommon: EdgeDataCommon = EdgeDataFactory.edgeDataCommon(sourceHandle, targetHandle, priority, immediate);
        switch (newEdgeDataTypeIdentifier) {
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

