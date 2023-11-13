import { EdgeTypeIndicator } from "./EdgeTypeIndicator";

export type EdgeData = EdgeDataEmpty | EdgeDataCreate;

export interface EdgeDataEmpty {
    type: "empty";
}

export interface EdgeDataCreate {
    type: "create";
    deniedEdgeTypes: EdgeTypeIndicator[];
}
