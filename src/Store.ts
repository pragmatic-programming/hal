import { create } from "zustand";
import { FlowState, State } from "./State";
import { CompilationContext, System } from "kico";
import { IHGraph } from "../../ihgraph";
import { addEdge, applyEdgeChanges, applyNodeChanges, Connection, EdgeChange, NodeChange } from "reactflow";
import { edges, nodes } from "./model/example";
import { flowToIHGraph, iHGraphToFlow, ihGraphToHalGraph } from "./model/processor/compilationContexts";


export const useStore = create<State>((setState, getState) => ({
    nodes: nodes,
    edges: edges,
    onNodesChange: (changes: NodeChange[]) => {
        setState({
            nodes: applyNodeChanges(changes, getState().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        setState({
            edges: applyEdgeChanges(changes, getState().edges),
        });
    },
    onConnect: (connection: Connection) => {
        setState({
            edges: addEdge(connection, getState().edges),
        });
    },
    projectName: "hello-world.hal",
    locked: true,
    mode: "light",
    context: new CompilationContext(new System("empty", [])),
    run: () => setState((state: State): State => {
        const preContext: CompilationContext = flowToIHGraph(new FlowState(state.nodes, state.edges));
        preContext.compile();
        const context: CompilationContext = ihGraphToHalGraph(preContext.getResult());
        context.compile();
        return {
            ...state,
            context: context
        };
    }),
    renderIhGraph: (ihGraph: IHGraph) => setState((state: State): State => {
        console.log(ihGraph);
        const context: CompilationContext = iHGraphToFlow(ihGraph);
        context.compile();
        const flowState = context.getResult();
        return {
            ...state,
            nodes: flowState.nodes,
            edges: flowState.edges,
        };
    }),
    switchLocked: () => setState((state: State): State => ({
        ...state,
        locked: !state.locked
    })),
    switchMode: () => setState((state: State): State => ({
        ...state,
        mode: state.mode === "dark" ? "light" : "dark"
    })),
}));
