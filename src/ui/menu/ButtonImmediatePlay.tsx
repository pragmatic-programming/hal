import React from "react";
import { FastForward } from "@mui/icons-material";
import ButtonMenu from "./ButtonMenu";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";

export default function ButtonImmediatePlay(): React.JSX.Element {
    const runImmediate = useStore((state: State) => state.immediateCompilation.runImmediate);
    return (
        <ButtonMenu
            onClick={runImmediate}
            icon={<FastForward fontSize="inherit" color={"success"}/>}
            tooltip="Compile Immediate"
        />
    );
}
