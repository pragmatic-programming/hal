import { StateEditor } from "./editor/StateEditor";
import { StateReactFlow } from "./reactFlow/StateReactFlow";
import { StateCompilation } from "./compilation/StateCompilation";
import { StateUi } from "./ui/StateUi";
import { StateMenuExamples } from "./menuExamples/StateMenuExamples";
import { StateCompilationImmediate } from "./compilation/StateCompilationImmediate";
import { StateMenuLayout } from "./menuLayout/StateMenuLayout";

export interface State {
    compilation: StateCompilation,
    immediateCompilation: StateCompilationImmediate,
    editor: StateEditor,
    menuExamples: StateMenuExamples,
    menuLayout: StateMenuLayout,
    reactFlow: StateReactFlow
    ui: StateUi,
}
