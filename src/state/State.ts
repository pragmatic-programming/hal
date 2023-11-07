import { StateDialogNodeNew } from "./dialogNodeNew/StateDialogNodeNew";
import { StateEditor } from "./editor/StateEditor";
import { StateReactFlow } from "./reactFlow/StateReactFlow";
import { StateCompilation } from "./compilation/StateCompilation";
import { StateUi } from "./ui/StateUi";
import { StateMenuExamples } from "./menuExamples/StateMenuExamples";

export interface State {
    compilation: StateCompilation,
    dialog: StateDialogNodeNew,
    editor: StateEditor,
    menuExamples: StateMenuExamples,
    reactFlow: StateReactFlow
    ui: StateUi,
}
