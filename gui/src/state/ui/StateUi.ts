import { StateExamples } from "./examples/StateExamples";
import { StateLayouts } from "./layout/StateLayouts";

export interface StateUi {
    busy: boolean,
    projectName: string,
    examples: StateExamples,
    layouts: StateLayouts,
}
