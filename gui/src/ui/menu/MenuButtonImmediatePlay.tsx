import React from "react";
import { FastForward } from "@mui/icons-material";
import MenuButton from "./MenuButton";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";

export default function MenuButtonImmediatePlay(): React.JSX.Element {
    const runImmediate = useStore((state: State) => state.immediateCompilation.runImmediate);
    return (
        <MenuButton
            onClick={runImmediate}
            icon={<FastForward fontSize="inherit" color={"success"}/>}
            tooltip="Compile Immediate"
        />
    );
}
