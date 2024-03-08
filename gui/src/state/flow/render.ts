import {State} from "../State";
import {IHGraph} from "@pragmatic-programming/ihgraph";
import {FitViewOptions} from "reactflow";
import {CompilationContext} from "@pragmatic-programming/kico";
import {iHGraphToFlow} from "../../processor/compilationContexts";
import {globalFitViewOptions} from "../../constants";
import {StoreApi} from "zustand";
import {layoutedNodes} from "../layoutedNodes";
import {layoutOptions} from "../../util";
import {NodesAndEdges} from "../../model/NodesAndEdges";
import {NodeData} from "../../model/node/NodeData";
import {Node} from "reactflow";

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
        const context: CompilationContext = iHGraphToFlow(ihGraph);
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
    };
}
