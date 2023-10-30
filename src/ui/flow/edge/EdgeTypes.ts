import { EdgeTypes } from "reactflow";
import { EdgeRenderer } from "./EdgeRenderer";

export const edgeTypes: EdgeTypes = {
    sequence: EdgeRenderer,
    execute: EdgeRenderer,
};
