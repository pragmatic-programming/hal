import { StateEditor } from "./editor/StateEditor";
import { StateFlow } from "./flow/StateFlow";
import { StateCompilation } from "./compilation/StateCompilation";
import { StateUi } from "./ui/StateUi";
import { StateExamples } from "./ui/examples/StateExamples";
import { StateCompilationImmediate } from "./compilation/StateCompilationImmediate";
import { StateLayouts } from "./ui/layout/StateLayouts";

export interface State {
    compilation: StateCompilation,
    immediateCompilation: StateCompilationImmediate,
    editor: StateEditor,
    flow: StateFlow
    ui: StateUi,
}
