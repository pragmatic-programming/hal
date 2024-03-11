import { State } from "./State";
import { IHGraph } from "@pragmatic-programming/ihgraph";
import { FitViewOptions } from "reactflow";

export function reRender(
    state: State,
    fitView: (fitViewOptions: FitViewOptions) => void,
): void {
    // if lastRenderGraph is null, if render() was never called
    // in this case we just exit the function and do nothing
    const lastRenderGraph: IHGraph | null = state.flow.lastRenderGraph;
    if (lastRenderGraph === null) {
        return;
    }
    state.flow.render(
        lastRenderGraph,
        fitView,
        state.ui.projectName
    );
}
