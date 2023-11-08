import { NodeTypes } from "reactflow";
import NodeEditor from "../node/NodeEditor";
import NodeResult from "../node/NodeResult";
import NodeCreation from "../node/NodeCreation";
import NodeImage from "../node/NodeImage";

export type nodeType = "creation" | "editor" | "result" | "image"

export const nodeTypesMapping: NodeTypes = {
    creation: NodeCreation,
    editor: NodeEditor,
    result: NodeResult,
    image: NodeImage,
};
