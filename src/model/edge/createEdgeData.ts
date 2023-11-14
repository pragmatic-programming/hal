import { EdgeData, EdgeDataCommon, EdgeDataCreate, EdgeDataEmpty } from "./EdgeData";
import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import { EdgeDataTypeIndicator } from "./EdgeDataTypeIndicator";
import { SourceHandleId } from "./SourceHandleId";
import { TargetHandleId } from "./TargetHandleId";


export function createEdgeDataEmpty(
    edgeDataCommon: EdgeDataCommon,
): EdgeDataEmpty {
    return {
        type: "empty",
        ...edgeDataCommon,
    };
}

export function createEdgeDataCreate(
    edgeDataCommon: EdgeDataCommon,
    deniedEdgeTypes: EdgeTypeIndicator[]
): EdgeDataCreate {
    return {
        type: "create",
        ...edgeDataCommon,
        deniedEdgeTypes: deniedEdgeTypes,
    };
}

export function createEdgeDataCommon(
    sourceHandle: SourceHandleId,
    targetHandle: TargetHandleId,
): EdgeDataCommon {
    return {
        sourceHandle: sourceHandle,
        targetHandle: targetHandle,
    };
}

export function createEdgeDataFromCreationEdge(
    newEdgeDataTypeIdentifier: EdgeDataTypeIndicator,
    sourceHandle: SourceHandleId,
    targetHandle: TargetHandleId
): EdgeData {
    const edgeDataCommon: EdgeDataCommon = createEdgeDataCommon(sourceHandle, targetHandle);
    switch (newEdgeDataTypeIdentifier) {
        case "create":
            return createEdgeDataCreate(
                edgeDataCommon,
                []
            );
        default:
            return createEdgeDataEmpty(
                edgeDataCommon
            );
    }
}
