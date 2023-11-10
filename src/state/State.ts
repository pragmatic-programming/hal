import { StateDialogNodeNew } from "./dialogNodeNew/StateDialogNodeNew";
import { StateEditor } from "./editor/StateEditor";
import { StateReactFlow } from "./reactFlow/StateReactFlow";
import { StateCompilation } from "./compilation/StateCompilation";
import { StateUi } from "./ui/StateUi";
import { StateMenuExamples } from "./menuExamples/StateMenuExamples";
import { StateCompilationImmediate } from "./compilation/StateCompilationImmediate";

export interface State {
    compilation: StateCompilation,
    immediateCompilation: StateCompilationImmediate,
    dialog: StateDialogNodeNew,
    editor: StateEditor,
    menuExamples: StateMenuExamples,
    reactFlow: StateReactFlow
    ui: StateUi,
}
