import { PaletteMode } from "@mui/material";
import { StateDialogNodeNew } from "./dialogNodeNew/StateDialogNodeNew";
import { StateEditor } from "./editor/StateEditor";
import { StateReactFlow } from "./reactFlow/StateReactFlow";
import { StateCompilation } from "./compilation/StateCompilation";

export interface State {
    busy: boolean,
    compilation: StateCompilation,
    dialog: StateDialogNodeNew,
    editor: StateEditor,
    mode: PaletteMode,
    projectName: string,
    reactFlow: StateReactFlow
    switchMode: () => void,
}
