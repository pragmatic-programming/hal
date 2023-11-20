import { StateExamples } from "./examples/StateExamples";
import { StateLayouts } from "./layout/StateLayouts";
import { StateMessage } from "./message/StateMessage";

export interface StateUi {
    busy: boolean,
    examples: StateExamples,
    layouts: StateLayouts,
    message: StateMessage,
    projectName: string,
}
