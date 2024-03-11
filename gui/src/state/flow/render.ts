import { State } from "../State";
import { IHGraph } from "@pragmatic-programming/ihgraph";
import { FitViewOptions, Node } from "reactflow";
import { CompilationContext } from "@pragmatic-programming/kico";
import { iHGraphToFlow } from "../../processors/compilationContexts";
import { globalFitViewOptions } from "../../constants";
import { StoreApi } from "zustand";
import { layoutedNodes } from "../layoutedNodes";
import { layoutOptions } from "../../util";
import { NodesAndEdges } from "../../model/NodesAndEdges";
import { IHGraphToFlowProcessor } from "../../processors/IHGraphToFlowProcessor";
import { NodeData } from "../../model/node/NodeData";

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
        // show that ui is busy and close example menu
        setState({
            ui: {
                ...getState().ui,
                projectName: projectName ? projectName : getState().ui.projectName,
                busy: true,
                examples: {
                    ...getState().ui.examples,
                    open: false,
                }
            },
        });
        // compile graph
        const induceHierarchy: boolean = getState().flow.hierarchyMode;
        const context: CompilationContext = iHGraphToFlow(ihGraph);
        context.startEnvironment.setProperty(IHGraphToFlowProcessor.IHGRAPH_HIERARCHY, induceHierarchy);
        await context.compileAsync();
        const nodesAndEdges: NodesAndEdges = context.getResult();
        const flow = {
            ...getState().flow,
            ...nodesAndEdges,
        };
        // layout graph
        if (isLayoutNecessary(nodesAndEdges)) {
            flow.nodes = await layoutedNodes(flow, layoutOptions(getState().flow.layoutOption));
        }
        // set compiled graph
        setState({
            flow: flow
        });
        // fit view
        window.requestAnimationFrame(() => {
            fitView(globalFitViewOptions);
        });
        // show that ui is not busy anymore
        setState({
            ui: {
                ...getState().ui,
                busy: false,
            },
        });
        setState({
            flow: {
                ...getState().flow,
                lastRenderGraph: ihGraph,
            },
        });
    };
}
