import { State } from "./State";
import { CompilationContext, System } from "kico";
import { onNodesChange } from "./flow/onNodesChange";
import { onEdgesChange } from "./flow/onEdgesChange";
import { onConnect } from "./flow/onConnect";
import { run } from "./compilation/run";
import { layout } from "./flow/layout";
import { render } from "./flow/render";
import { setEdgeLabel } from "./flow/setEdgeLabel";
import { editorOpen } from "./editor/editorOpen";
import { editorContentSet } from "./editor/editorContentSet";
import { editorLabelSet } from "./editor/editorLabelSet";
import { createWithEqualityFn } from "zustand/traditional";
import { transformCreateNode } from "./flow/transformCreateNode";
import { setConnectingSource } from "./flow/setConnectingSource";
import { setNodeNodeDataLanguage } from "./flow/setNodeNodeDataLanguage";
import { setEdgePathStyle } from "./flow/setEdgePathStyle";
import { setNodeNodeDataLabel } from "./flow/setNodeNodeDataLabel";
import { setNodeNodeDataContent } from "./flow/setNodeNodeDataContent";
import { runImmediate } from "./compilation/runImmediate";
import { transformCreateEdge } from "./flow/transformCreateEdge";
import { Position } from "@reactflow/core";
import { nextNodeId } from "./flow/nextNodeId";
import { layoutsOpenToggle } from "./ui/layout/layoutsOpenToggle";
import { NodeFactory } from "../model/node/NodeFactory";
import { examplesOpenToggle } from "./ui/examples/examplesOpenToggle";
import { setContent } from "./ui/message/setContent";
import { addNodeCreate } from "./flow/addNodeCreate";

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
    flow: {
        addNodeCreate: addNodeCreate(setState, getState),
        connectingSourceNodeId: null,
        connectingSourceHandleId: null,
        edgePathStyle: "Smooth",
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
        setConnectingSource: setConnectingSource(setState),
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
        message: {
            content: undefined,
            setContent: setContent(setState, getState),
            severity: "success",
        },
        examples: {
            open: false,
            examplesOpenToggle: examplesOpenToggle(setState),
        },
        layouts: {
            open: false,
            layoutsOpenToggle: layoutsOpenToggle(setState),
        },
        // todo what should we do with the project name
        projectName: "hello-world.hal",
    },
}));
