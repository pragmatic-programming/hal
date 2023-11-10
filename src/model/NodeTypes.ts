import { NodeTypes } from "reactflow";
import NodeEditor from "../ui/flow/node/NodeEditor";
import NodeResult from "../ui/flow/node/NodeResult";
import NodeCreation from "../ui/flow/node/NodeCreation";
import NodeImage from "../ui/flow/node/NodeImage";

export type nodeType = "creation" | "editor" | "result" | "image"

export const nodeTypesMapping: NodeTypes = {
    creation: NodeCreation,
    editor: NodeEditor,
    result: NodeResult,
    image: NodeImage,
};
