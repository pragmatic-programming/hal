import { NodeTypes } from "reactflow";
import NodeEditor from "../node/NodeEditor";
import NodeResult from "../node/NodeResult";
import NodeCreation from "../node/NodeCreation";

export type nodeType = "creation" | "editor" | "result"

export const nodeTypesMapping: NodeTypes = {
    creation: NodeCreation,
    editor: NodeEditor,
    result: NodeResult,
};
