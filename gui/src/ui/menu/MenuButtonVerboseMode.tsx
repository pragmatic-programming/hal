import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import MenuButtonToggle from "./MenuButtonToggle";

export default function MenuButtonVerboseMode(): React.JSX.Element {
    const toggleVerboseMode = useStore((state: State) => state.flow.toggleVerboseMode);
    const verboseMode: boolean = useStore((state: State) => state.flow.verboseMode);
    return (
        <MenuButtonToggle
            iconOff={<VisibilityOff fontSize="inherit"/>}
            iconOn={<Visibility fontSize="inherit"/>}
            on={verboseMode}
            onClick={toggleVerboseMode}
            tooltipOff="Verbose"
            tooltipOn="Compact"
        />
    );
}
