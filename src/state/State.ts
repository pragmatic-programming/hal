import { PaletteMode } from "@mui/material";
import { CompilationContext } from "kico";
import { IHGraph } from "ihgraph";
import { Edge, FitViewOptions, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import { LayoutOptions } from "elkjs/lib/elk-api";
import NodeData from "../model/NodeData";
import { NewDialogOpenState } from "./substates/NewDialogOpenState";
import { EditorOpenState } from "./substates/EditorOpenState";
import { nodeType } from "../ui/flow/flow/NodeTypes";

export interface State {
    //state
    busy: boolean,
    context: CompilationContext,
    edges: Edge[],
    editorOpen: EditorOpenState | undefined,
    mode: PaletteMode,
    newNodeDialogOpen: NewDialogOpenState | undefined,
    nodes: Node<NodeData>[],
    projectName: string,
    //manipulators
    editorOpenSetContent: (content: string | undefined) => void,
    editorOpenSetLabel: (content: string) => void,
    layout: (getNode: (nodeId: string) => Node | undefined, fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions?: LayoutOptions) => void,
    onConnect: OnConnect,
    onEdgesChange: OnEdgesChange,
    onNodesChange: OnNodesChange,
    openEditor: (getNode: (nodeId: string) => Node | undefined, editorId: string | undefined) => void,
    openNewNodeDialog: (nodeId: string | undefined) => void,
    renderIhGraph: (ihGraph: IHGraph, getNode: (nodeId: string) => Node | undefined, fitView: () => void) => void,
    run: () => void,
    setEdgeLabel: (nodeId: string, label: string) => void,
    setNodeLabel: (nodeId: string, label: string) => void,
    setNodeType: (nodeId: string, type: nodeType) => void,
    setNodeValue: (nodeId: string, content: string | undefined) => void,
    switchMode: () => void,
}
