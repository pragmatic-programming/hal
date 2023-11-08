import { State } from "./State";
import { CompilationContext, System } from "kico";
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
import { setNodeNodeDataLanguage } from "./reactFlow/setNodeNodeDataLanguage";
import { setEdgePathStyle } from "./reactFlow/setEdgePathStyle";
import { nextNodeId } from "./reactFlow/nextNodeId";
import { menuOpenToggle } from "./menuExamples/menuOpenToggle";
import { iHGraphToFlow } from "../model/processor/compilationContexts";
import { createIHGraphFromJSON } from "ihgraph";
import { examples } from "../model/examples/examples";
import { setNodeNodeDataLabel } from "./reactFlow/setNodeNodeDataLabel";
import { setNodeNodeDataContent } from "./reactFlow/setNodeNodeDataContent";

const context: CompilationContext = iHGraphToFlow(createIHGraphFromJSON(examples[0].value));
context.compile();
const example = context.getResult();

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
    menuExamples: {
        open: false,
        menuOpenToggle: menuOpenToggle(setState),
    },
    reactFlow: {
        connectingSourceNodeId: null,
        edgePathStyle: "Bezier",
        edges: example.edges,
        layout: layout(setState, getState),
        nextNodeId: nextNodeId(getState),
        nodes: example.nodes,
        onConnect: onConnect(setState, getState),
        onEdgesChange: onEdgesChange(setState, getState),
        onNodesChange: onNodesChange(setState, getState),
        setConnectingSourceNodeId: setConnectingSourceNodeId(setState),
        setEdgeLabel: setEdgeLabel(setState, getState),
        setEdgePathStyle: setEdgePathStyle(setState, getState),
        setNodeNodeDataContent: setNodeNodeDataContent(setState, getState),
        setNodeNodeDataLabel: setNodeNodeDataLabel(setState, getState),
        setNodeNodeDataLanguage: setNodeNodeDataLanguage(setState, getState),
        setNodeType: setNodeType(setState, getState),
    },
    ui: {
        busy: false,
        mode: "light",
        projectName: "hello-world.hal",
        switchMode: switchMode(setState),
    },
}));
