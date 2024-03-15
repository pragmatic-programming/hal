import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import { SourceHandleId } from "./SourceHandleId";
import { TargetHandleId } from "./TargetHandleId";
import { EdgePathStyle } from "./EdgePathStyle";

export type EdgeData = EdgeDataEmpty | EdgeDataCreate;

export interface EdgeDataCommon {
    sourceHandle: SourceHandleId;
    targetHandle: TargetHandleId;
    edgePathStyle: EdgePathStyle;
    priority: number;
    immediate: boolean;
    bidirectional: boolean;
    description: string;
}

export interface EdgeDataEmpty extends EdgeDataCommon {
    type: "empty";
}

export interface EdgeDataCreate extends EdgeDataCommon {
    type: "create";
    deniedEdgeTypes: EdgeTypeIndicator[];
}
