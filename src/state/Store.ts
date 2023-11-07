import { State } from "./State";
import { CompilationContext, System } from "kico";
import { edges, nodes } from "../model/example";
import { onNodesChange } from "./reactFlow/onNodesChange";
import { onEdgesChange } from "./reactFlow/onEdgesChange";
import { onConnect } from "./reactFlow/onConnect";
import { run } from "./compilation/run";
import { layout } from "./reactFlow/layout";
import { render } from "./compilation/render";
import { switchMode } from "./ui/switchMode";
import { setEdgeLabel } from "./reactFlow/setEdgeLabel";
import { dialogOpen } from "./dialogNodeNew/dialogOpen";
import { editorOpen } from "./editor/editorOpen";
import { editorContentSet } from "./editor/editorContentSet";
import { editorLabelSet } from "./editor/editorLabelSet";
import { createWithEqualityFn } from "zustand/traditional";
import { setNodeType } from "./reactFlow/setNodeType";
import { setConnectingSourceNodeId } from "./reactFlow/setConnectingSourceNodeId";
import { setNodeNodeData } from "./reactFlow/setNodeNodeData";
import { setEdgePathStyle } from "./reactFlow/setEdgePathStyle";
import { nextNodeId } from "./reactFlow/nextNodeId";

export const useStore = createWithEqualityFn<State>((setState, getState) => ({
    compilation: {
        context: new CompilationContext(new System("empty", [])),
        render: render(setState, getState),
        run: run(setState),
    },
    dialog: {
        open: undefined,
        dialogOpen: dialogOpen(setState),
    },
    editor: {
        open: undefined,
        editorContentSet: editorContentSet(setState),
        editorLabelSet: editorLabelSet(setState),
        editorOpen: editorOpen(setState, getState),
    },
    reactFlow: {
        connectingSourceNodeId: null,
        edgePathStyle: "Bezier",
        edges: edges,
        layout: layout(setState, getState),
        nextNodeId: nextNodeId(getState),
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
    ui:{
        busy: false,
        mode: "light",
        projectName: "hello-world.hal",
        switchMode: switchMode(setState),
    },
}));
