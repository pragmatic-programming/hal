import { StateEditor } from "./editor/StateEditor";
import { StateFlow } from "./flow/StateFlow";
import { StateCompilation } from "./compilation/StateCompilation";
import { StateUi } from "./ui/StateUi";
import { StateCompilationImmediate } from "./compilation/StateCompilationImmediate";

export interface State {
    compilation: StateCompilation,
    immediateCompilation: StateCompilationImmediate,
    editor: StateEditor,
    flow: StateFlow
    ui: StateUi,
}
