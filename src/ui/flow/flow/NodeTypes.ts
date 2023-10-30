import { NodeTypes } from "reactflow";
import NodeEditor from "../node/NodeEditor";
import NodeResult from "../node/NodeResult";
import NodeCreation from "../node/NodeCreation";

export const nodeTypes: NodeTypes = {
    creation: NodeCreation,
    editor: NodeEditor,
    result: NodeResult,
};
