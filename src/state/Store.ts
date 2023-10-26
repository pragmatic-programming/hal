import { create } from "zustand";
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

export const useStore = create<State>((setState, getState) => ({
    busy: false,
    context: new CompilationContext(new System("empty", [])),
    edges: edges,
    layout: layout(setState, getState),
    mode: "light",
    nodes: nodes,
    onConnect: onConnect(getState, setState),
    onEdgesChange: onEdgesChange(setState, getState),
    onNodesChange: onNodesChange(setState, getState),
    projectName: "hello-world.hal",
    renderIhGraph: renderIhGraph(setState, getState),
    run: run(setState),
    setNodeValue: setNodeContent(getState, setState),
    setNodeLabel: setNodeLabel(getState, setState),
    setEdgeLabel: setEdgeLabel(getState, setState),
    switchMode: switchMode(setState),
}));