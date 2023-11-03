import { PaletteMode } from "@mui/material";
import { CompilationContext } from "kico";
import { IHGraph } from "ihgraph";
import { Edge, FitViewOptions, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import { LayoutOptions } from "elkjs/lib/elk-api";
import NodeData from "../model/NodeData";
import { NewDialogOpenState } from "./substates/NewDialogOpenState";
import { EditorOpenState } from "./substates/EditorOpenState";
import { nodeType } from "../ui/flow/flow/NodeTypes";
import { EdgePathStyle } from "./EdgePathStyle";

export interface State {
    //state
    busy: boolean,
    connectingSourceNodeId: string | null,
    context: CompilationContext,
    edgePathStyle: EdgePathStyle
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
    setConnectingSourceNodeId: (nodeId: string | null) => void,
    setEdgeLabel: (nodeId: string, label: string) => void,
    setEdgePathStyle: (edgePathStyle: EdgePathStyle) => void,
    setNodeNodeData: (nodeId: string, nodeData: Partial<NodeData>) => void,
    setNodeType: (nodeId: string, type: nodeType) => void,
    switchMode: () => void,
}
