import { State } from "./State";
import { CompilationContext, System } from "kico";
import { edges, nodes } from "../model/example";
import { onNodesChange } from "./manipulate/onNodesChange";
import { onEdgesChange } from "./manipulate/onEdgesChange";
import { onConnect } from "./manipulate/onConnect";
import { run } from "./manipulate/run";
import { layout } from "./manipulate/layout";
import { renderIhGraph } from "./manipulate/renderIhGraph";
import { switchMode } from "./manipulate/switchMode";
import { setEdgeLabel } from "./manipulate/setEdgeLabel";
import { openNewDialog } from "./manipulate/openNewDialog";
import { openEditor } from "./manipulate/openEditor";
import { editorOpenSetContent } from "./manipulate/editorOpenSetContent";
import { editorOpenSetLabel } from "./manipulate/editorOpenSetLabel";
import { createWithEqualityFn } from "zustand/traditional";
import { setNodeType } from "./manipulate/setNodeType";
import { setConnectingSourceNodeId } from "./manipulate/setConnectingSourceNodeId";
import { setNodeNodeData } from "./manipulate/setNodeNodeData";
import { setEdgePathStyle } from "./manipulate/setEdgePathStyle";

export const useStore = createWithEqualityFn<State>((setState, getState) => ({
    busy: false,
    context: new CompilationContext(new System("empty", [])),
    reactFlow: {
        connectingSourceNodeId: null,
        edgePathStyle: "Bezier",
        edges: edges,
        layout: layout(setState, getState),
        nodes: nodes,
        onConnect: onConnect(setState, getState),
        onEdgesChange: onEdgesChange(setState, getState),
        onNodesChange: onNodesChange(setState, getState),
        setConnectingSourceNodeId: setConnectingSourceNodeId(setState),
        setEdgeLabel: setEdgeLabel(setState, getState),
        setEdgePathStyle: setEdgePathStyle(setState, getState),
        setNodeNodeData: setNodeNodeData(setState, getState),
        setNodeType: setNodeType(setState, getState),
    },
    editorOpen: undefined,
    mode: "light",
    newNodeDialogOpen: undefined,
    projectName: "hello-world.hal",
    editorOpenSetContent: editorOpenSetContent(setState),
    editorOpenSetLabel: editorOpenSetLabel(setState),
    openEditor: openEditor(setState, getState),
    openNewNodeDialog: openNewDialog(setState),
    renderIhGraph: renderIhGraph(setState, getState),
    run: run(setState),
    switchMode: switchMode(setState),
}));
