import { PaletteMode } from "@mui/material";
import { StateDialogNodeNew } from "./dialogNodeNew/StateDialogNodeNew";
import { StateEditor } from "./editor/StateEditor";
import { StateReactFlow } from "./reactFlow/StateReactFlow";
import { StateCompilation } from "./compilation/StateCompilation";
import { StateUi } from "./ui/StateUi";

export interface State {
    compilation: StateCompilation,
    dialog: StateDialogNodeNew,
    editor: StateEditor,
    reactFlow: StateReactFlow
    ui: StateUi,
}
