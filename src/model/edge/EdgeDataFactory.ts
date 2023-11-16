import { EdgeData, EdgeDataCommon, EdgeDataCreate, EdgeDataEmpty } from "./EdgeData";
import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import { EdgeDataTypeIndicator } from "./EdgeDataTypeIndicator";
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
    ): EdgeDataCommon {
        return {
            sourceHandle: sourceHandle,
            targetHandle: targetHandle,
        };
    }

    static edgeDataFromCreationEdge(
        newEdgeDataTypeIdentifier: EdgeDataTypeIndicator,
        sourceHandle: SourceHandleId,
        targetHandle: TargetHandleId
    ): EdgeData {
        const edgeDataCommon: EdgeDataCommon = EdgeDataFactory.edgeDataCommon(sourceHandle, targetHandle);
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

