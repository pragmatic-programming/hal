import { State } from "./State";
import { CompilationContext, System } from "kico";
import { onNodesChange } from "./reactFlow/onNodesChange";
import { onEdgesChange } from "./reactFlow/onEdgesChange";
import { onConnect } from "./reactFlow/onConnect";
import { run } from "./compilation/run";
import { layout } from "./reactFlow/layout";
import { render } from "./reactFlow/render";
import { switchMode } from "./ui/switchMode";
import { setEdgeLabel } from "./reactFlow/setEdgeLabel";
import { editorOpen } from "./editor/editorOpen";
import { editorContentSet } from "./editor/editorContentSet";
import { editorLabelSet } from "./editor/editorLabelSet";
import { createWithEqualityFn } from "zustand/traditional";
import { transformCreateNode } from "./reactFlow/transformCreateNode";
import { setConnectingSourceNodeId } from "./reactFlow/setConnectingSourceNodeId";
import { setNodeNodeDataLanguage } from "./reactFlow/setNodeNodeDataLanguage";
import { setEdgePathStyle } from "./reactFlow/setEdgePathStyle";
import { menuExamplesOpenToggle } from "./menuExamples/menuExamplesOpenToggle";
import { setNodeNodeDataLabel } from "./reactFlow/setNodeNodeDataLabel";
import { setNodeNodeDataContent } from "./reactFlow/setNodeNodeDataContent";
import { runImmediate } from "./compilation/runImmediate";
import { transformCreateEdge } from "./reactFlow/transformCreateEdge";
import { Position } from "@reactflow/core";
import { nextNodeId } from "./reactFlow/nextNodeId";
import { menuLayoutOpenToggle } from "./menuLayout/menuLayoutOpenToggle";
import { NodeFactory } from "../model/node/NodeFactory";

export const useStore = createWithEqualityFn<State>((setState, getState) => ({
    compilation: {
        context: new CompilationContext(new System("empty", [])),
        run: run(setState, getState),
    },
    immediateCompilation: {
        context: new CompilationContext(new System("empty", [])),
        runImmediate: runImmediate(setState, getState),
    },
    editor: {
        open: undefined,
        editorContentSet: editorContentSet(setState),
        editorLabelSet: editorLabelSet(setState),
        editorOpen: editorOpen(setState, getState),
    },
    menuExamples: {
        open: false,
        menuExampleOpenToggle: menuExamplesOpenToggle(setState),
    },
    menuLayout: {
        open: false,
        menuLayoutOpenToggle: menuLayoutOpenToggle(setState),
    },
    reactFlow: {
        connectingSourceNodeId: null,
        edgePathStyle: "Bezier",
        edges: [],
        layout: layout(setState, getState),
        layoutOption: "horizontal",
        nextNodeId: nextNodeId(getState),
        nodes: [
            // crate first node
            NodeFactory.nodeCreate("1", 100, 100, Position.Left)
        ],
        onConnect: onConnect(setState, getState),
        onEdgesChange: onEdgesChange(setState, getState),
        onNodesChange: onNodesChange(setState, getState),
        render: render(setState, getState),
        setConnectingSourceNodeId: setConnectingSourceNodeId(setState),
        setEdgeLabel: setEdgeLabel(setState, getState),
        setEdgePathStyle: setEdgePathStyle(setState, getState),
        setNodeNodeDataContent: setNodeNodeDataContent(setState, getState),
        setNodeNodeDataLabel: setNodeNodeDataLabel(setState, getState),
        setNodeNodeDataLanguage: setNodeNodeDataLanguage(setState, getState),
        transformCreateEdge: transformCreateEdge(setState, getState),
        transformCreateNode: transformCreateNode(setState, getState),
    },
    ui: {
        busy: false,
        mode: "light",
        // todo what should we do with the project name
        projectName: "hello-world.hal",
        switchMode: switchMode(setState),
    },
}));
