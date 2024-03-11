import { State } from "./State";
import { IHGraph } from "@pragmatic-programming/ihgraph";

export function reRender(state: State): void {
    // if lastRenderGraph is null, if render() was never called
    // in this case we just exit the function and do nothing
    const lastRenderGraph: IHGraph | null = state.flow.lastRenderGraph;
    if (lastRenderGraph === null) {
        return;
    }
    state.flow.render(
        lastRenderGraph,
        // todo can we remove this?
        state.flow.lastFitView,
        state.ui.projectName
    );
}
