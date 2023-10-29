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
import { setNodeContent } from "./manipulate/setNodeContent";
import { setNodeLabel } from "./manipulate/setNodeLabel";
import { setEdgeLabel } from "./manipulate/setEdgeLabel";
import { toggleDrawer } from "./manipulate/toggleDrawer";
import { openEditor } from "./manipulate/openEditor";
import { editorOpenSetContent } from "./manipulate/editorOpenSetContent";
import { editorOpenSetLabel } from "./manipulate/editorOpenSetLabel";
import { createWithEqualityFn } from "zustand/traditional";

export const useStore = createWithEqualityFn<State>((setState, getState) => ({
    busy: false,
    context: new CompilationContext(new System("empty", [])),
    drawerOpen: false,
    edges: edges,
    editorOpen: undefined,
    editorOpenSetContent: editorOpenSetContent(setState),
    editorOpenSetLabel: editorOpenSetLabel(setState),
    layout: layout(setState, getState),
    mode: "light",
    nodes: nodes,
    onConnect: onConnect(setState, getState),
    onEdgesChange: onEdgesChange(setState, getState),
    onNodesChange: onNodesChange(setState, getState),
    openEditor: openEditor(setState, getState,),
    projectName: "hello-world.hal",
    renderIhGraph: renderIhGraph(setState, getState),
    run: run(setState),
    setEdgeLabel: setEdgeLabel(setState, getState,),
    setNodeLabel: setNodeLabel(setState, getState,),
    setNodeValue: setNodeContent(setState, getState,),
    switchMode: switchMode(setState),
    toggleDrawer: toggleDrawer(setState),
}));
