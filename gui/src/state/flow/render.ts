import { State } from "../State";
import { IHGraph } from "@pragmatic-programming/ihgraph";
import { FitViewOptions, Node } from "reactflow";
import { CompilationContext } from "@pragmatic-programming/kico";
import { iHGraphToFlow } from "../../processors/compilationContexts";
import { globalFitViewOptions } from "../../constants";
import { StoreApi } from "zustand";
import { layoutOptions } from "../../util";
import { NodesAndEdges } from "../../model/NodesAndEdges";
import { IHGraphToFlowProcessor } from "../../processors/IHGraphToFlowProcessor";
import { NodeData } from "../../model/node/NodeData";
import { StateFlow } from "./StateFlow";
import { layoutedNodes } from "../layoutedNodes";


async function compile(hierachyMode: boolean, ihGraph: IHGraph): Promise<NodesAndEdges> {
    const context: CompilationContext = iHGraphToFlow(ihGraph);
    context.startEnvironment.setProperty(IHGraphToFlowProcessor.IHGRAPH_HIERARCHY, hierachyMode);
    await context.compileAsync();
    return context.getResult();
}

async function layout(state: StateFlow, nodesAndEdges: NodesAndEdges): Promise<NodesAndEdges> {
    if (isLayoutNecessary(nodesAndEdges)) {
        return layoutedNodes(
            nodesAndEdges,
            layoutOptions(state.layoutOption)
        )
    }
    return nodesAndEdges
}

function isLayoutNecessary(nodesAndEdges: NodesAndEdges): boolean {
    return nodesAndEdges
        .nodes
        .find((node: Node<NodeData>): boolean => node.data.position === undefined) !== undefined;
}

export function render(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (
        ihGraph: IHGraph,
        fitView: (fitViewOptions: FitViewOptions) => void,
        projectName?: string
    ): Promise<void> => {
        let state: State = getState();
        // show that ui is busy and close example menu
        setState({
            ui: {
                ...state.ui,
                projectName: projectName ? projectName : state.ui.projectName,
                busy: true,
                examples: {
                    ...state.ui.examples,
                    open: false,
                }
            },
        });
        state = getState();
        // compile graph
        const nodesAndEdges = await compile(state.flow.hierarchyMode, ihGraph);
        // set compiled graph
        setState({
            flow: {
                ...state.flow,
                ...await layout(state.flow, nodesAndEdges),
                lastRenderGraph: ihGraph,
            }
        });
        // fit view
        window.requestAnimationFrame(() => {
            fitView(globalFitViewOptions);
        });
        state = getState();
        // show that ui is not busy anymore
        setState({
            ui: {
                ...state.ui,
                busy: false,
            },
        });
    };
}
