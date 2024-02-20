import React from "react";
import { Edit, EditOff } from "@mui/icons-material";

import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import MenuButtonToggle from "./MenuButtonToggle";

export default function MenuButtonVerboseMode(): React.JSX.Element {
    const toggleVerboseMode = useStore((state: State) => state.flow.toggleVerboseMode);
    const verboseMode: boolean = useStore((state: State) => state.flow.verboseMode);
    return (
        <MenuButtonToggle
            onClick={toggleVerboseMode}
            on={verboseMode}
            iconOn={<Edit fontSize="inherit"/>}
            iconOff={<EditOff fontSize="inherit"/>}
            tooltip="Compile"
        />
    );
}
