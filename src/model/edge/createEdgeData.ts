import { EdgeData, EdgeDataCreate, EdgeDataEmpty } from "./EdgeData";
import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import { EdgeDataTypeIndicator } from "./EdgeDataTypeIndicator";


export function createEdgeDataEmpty(): EdgeDataEmpty {
    return {
        type: "empty",
    };
}

export function createEdgeDataCreate(deniedEdgeTypes: EdgeTypeIndicator[]): EdgeDataCreate {
    return {
        type: "create",
        deniedEdgeTypes: deniedEdgeTypes,
    };
}

export function createEdgeDataFromCreationEdge(newEdgeDataTypeIdentifier: EdgeDataTypeIndicator): EdgeData {
    switch (newEdgeDataTypeIdentifier) {
        case "create":
            return createEdgeDataCreate([]);
        default:
            return createEdgeDataEmpty();
    }
}
