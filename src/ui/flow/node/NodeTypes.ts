import { NodeTypes } from "reactflow";
import EditorNode from "./EditorNode";
import ResultNode from "./ResultNode";
import CreationNode from "./CreationNode";

export const nodeTypes: NodeTypes = {
    creationNode: CreationNode,
    editorNode: EditorNode,
    resultNode: ResultNode,
};
