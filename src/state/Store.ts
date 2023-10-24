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

export const useStore = create<State>((setState, getState) => ({
    nodes: nodes,
    edges: edges,
    onNodesChange: onNodesChange(setState, getState),
    onEdgesChange: onEdgesChange(setState, getState),
    onConnect: onConnect(getState, setState),
    busy: false,
    projectName: "hello-world.hal",
    mode: "light",
    context: new CompilationContext(new System("empty", [])),
    run: run(setState),
    layout: layout(setState, getState),
    renderIhGraph: renderIhGraph(setState, getState),
    switchMode: switchMode(setState),
}));
