import React from "react";
import { PlayArrow } from "@mui/icons-material";
import MenuButton from "./MenuButton";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";

export default function PlayButton(): React.JSX.Element {
    const run = useStore((state: State) => state.run)
    return (
        <MenuButton
            onClick={run}
            icon={<PlayArrow fontSize="inherit" color={"success"}/>}
            tooltip="Compile"
        />
    );
}
