import React from "react";
import MenuButtonDoubleClick from "./MenuButtonDoubleClick";
import { PlayArrow } from "@mui/icons-material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";

export default function MenuButtonPlay(): React.JSX.Element {
    const run = useStore((state: State) => state.compilation.run);
    const menuOpenToggle = useStore((state: State) => state.ui.compilations.compilationsOpenToggle);
    return (
        <MenuButtonDoubleClick
            icon={<PlayArrow fontSize="inherit" color={"success"}/>}
            onClick={run}
            onDoubleClick={menuOpenToggle}
            tooltip="Compile"
        />
    );
}