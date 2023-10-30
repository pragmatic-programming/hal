import React from "react";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { Theme, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import ButtonMenu from "./ButtonMenu";

export default function ButtonSwitchMode(): React.JSX.Element {
    const theme: Theme = useTheme();
    const switchMode = useStore((state: State) => state.switchMode);
    return (
        <ButtonMenu
            onClick={switchMode}
            icon={theme.palette.mode === "dark" ? <Brightness7/> : <Brightness4/>}
            tooltip={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
        />
    );
}
