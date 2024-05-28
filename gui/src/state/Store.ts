import { State } from "./State";
import { CompilationContext, System } from "@pragmatic-programming/kico";
import { onNodesChange } from "./flow/onNodesChange";
import { onEdgesChange } from "./flow/onEdgesChange";
import { onConnect } from "./flow/onConnect";
import { run } from "./compilation/run";
import { layout } from "./flow/layout";
import { render } from "./flow/render";
import { setEdgeLabel } from "./flow/setEdgeLabel";
import { setEdgeEdgeDataDescription } from "./flow/setEdgeEdgeDataDescription";
import { editorOpen } from "./editor/editorOpen";
import { editorContentSet } from "./editor/editorContentSet";
import { editorLabelSet } from "./editor/editorLabelSet";
import { createWithEqualityFn } from "zustand/traditional";
import { transformCreateNode } from "./flow/transformCreateNode";
import { setConnectingSource } from "./flow/setConnectingSource";
import { setNodeNodeDataLanguage } from "./flow/setNodeNodeDataLanguage";
import { setEdgePathStyleForAll } from "./flow/setEdgePathStyleForAll";
import { setNodeNodeDataLabel } from "./flow/setNodeNodeDataLabel";
import { setNodeNodeDataContent } from "./flow/setNodeNodeDataContent";
import { runImmediate } from "./compilation/runImmediate";
import { transformCreateEdge } from "./flow/transformCreateEdge";
import { Position } from "@reactflow/core";
import { nextNodeId } from "./flow/nextNodeId";
import { compilationsOpenToggle } from "./ui/compilations/compilationsOpenToggle";
import { layoutsOpenToggle } from "./ui/layout/layoutsOpenToggle";
import { NodeFactory } from "../model/node/NodeFactory";
import { examplesOpenToggle } from "./ui/examples/examplesOpenToggle";
import { setContent } from "./ui/message/setContent";
import { addNodeCreate } from "./flow/addNodeCreate";
import { setEdgePathStyleForEdge } from "./flow/setEdgePathStyleForEdge";
import { cycleMode } from "./flow/cycleMode";
import { setEdgeEdgeDataPriority } from "./flow/setEdgeEdgeDataPriority";
import { toggleHierarchyMode } from "./flow/toggleHierarchyMode";
import { originOfCoordinates } from "../util";
import { HALGraphProcessor } from "../processors/directors/HALGraphProcessor";
import { setDirector } from "./compilation/setDirector";
import { toggleShowHALProcessor } from "./compilation/options/toggleShowHALProcessor";

export const useStore = createWithEqualityFn<State>((setState, getState) => ({
    compilation: {
        context: new CompilationContext(new System("empty", [])),
        director: HALGraphProcessor,
        setDirector: setDirector(setState, getState),
        run: run(setState, getState),
        options: {
            showHALProcessor: false,
            toggleShowHALProcessor: toggleShowHALProcessor(setState, getState),
        }
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
            NodeFactory.nodeCreate(
                "1",
                originOfCoordinates(),
                Position.Left
            )
        ],
        cycleMode: cycleMode(setState, getState),
        hierarchyMode: false,
        lastRenderGraph: null,
        mode: "text",
        onConnect: onConnect(setState, getState),
        onEdgesChange: onEdgesChange(setState, getState),
        onNodesChange: onNodesChange(setState, getState),
        render: render(setState, getState),
        setConnectingSource: setConnectingSource(setState),
        setEdgeEdgeDataDescription: setEdgeEdgeDataDescription(setState, getState),
        setEdgeLabel: setEdgeLabel(setState, getState),
        setEdgePathStyleForAll: setEdgePathStyleForAll(setState, getState),
        setEdgePathStyleForEdge: setEdgePathStyleForEdge(setState, getState),
        setEdgeEdgeDataPriority: setEdgeEdgeDataPriority(setState, getState),
        setNodeNodeDataContent: setNodeNodeDataContent(setState, getState),
        setNodeNodeDataLabel: setNodeNodeDataLabel(setState, getState),
        setNodeNodeDataLanguage: setNodeNodeDataLanguage(setState, getState),
        toggleHierarchyMode: toggleHierarchyMode(setState, getState),
        transformCreateEdge: transformCreateEdge(setState, getState),
        transformCreateNode: transformCreateNode(setState, getState),
    },
    ui: {
        busy: false,
        compilations: {
            open: false,
            compilationsOpenToggle: compilationsOpenToggle(setState),
        },
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
