import { State } from "../State";
import { IHGraph } from "@pragmatic-programming/ihgraph";

export function reRender(getState: () => State) {
    return () => getState().flow.render(getState().flow.lastRenderGraph as IHGraph, getState().flow.lastFitView, getState().ui.projectName);
}