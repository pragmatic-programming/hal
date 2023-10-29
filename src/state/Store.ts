import { State } from "./State";
import { CompilationContext, System } from "kico";
import { edges, nodes } from "../model/example";
import { onNodesChange } from "./onNodesChange";
import { onEdgesChange } from "./onEdgesChange";
import { onConnect } from "./onConnect";
import { run } from "./run";
import { layout } from "./layout";
import { renderIhGraph } from "./renderIhGraph";
import { switchMode } from "./switchMode";
import { setNodeContent } from "./setNodeContent";
import { setNodeLabel } from "./setNodeLabel";
import { setEdgeLabel } from "./setEdgeLabel";
import { toggleDrawer } from "./toggleDrawer";
import { openEditor } from "./openEditor";
import { editorOpenSetContent } from "./editorOpenSetContent";
import { editorOpenSetLabel } from "./editorOpenSetLabel";
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
