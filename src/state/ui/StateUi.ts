import { PaletteMode } from "@mui/material";

export interface StateUi {
    busy: boolean,
    mode: PaletteMode,
    projectName: string,
    switchMode: () => void,
}
