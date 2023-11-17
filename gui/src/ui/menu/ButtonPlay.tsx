import React from "react";
import { PlayArrow } from "@mui/icons-material";
import ButtonMenu from "./ButtonMenu";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";

export default function ButtonPlay(): React.JSX.Element {
    const run = useStore((state: State) => state.compilation.run);
    return (
        <ButtonMenu
            onClick={run}
            icon={<PlayArrow fontSize="inherit" color={"success"}/>}
            tooltip="Compile"
        />
    );
}
