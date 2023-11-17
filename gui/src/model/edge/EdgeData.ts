import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import { SourceHandleId } from "./SourceHandleId";
import { TargetHandleId } from "./TargetHandleId";

export type EdgeData = EdgeDataEmpty | EdgeDataCreate;

export interface EdgeDataCommon {
    sourceHandle: SourceHandleId
    targetHandle: TargetHandleId
}
export interface EdgeDataEmpty extends EdgeDataCommon{
    type: "empty";
}

export interface EdgeDataCreate extends EdgeDataCommon{
    type: "create";
    deniedEdgeTypes: EdgeTypeIndicator[];
}
