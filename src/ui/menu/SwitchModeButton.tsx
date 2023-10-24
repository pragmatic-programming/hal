import React from "react";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import MenuButton from "./MenuButton";
import { Theme, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export default function SwitchModeButton(): React.JSX.Element {
    const theme: Theme = useTheme();
    const switchMode = useStore((state: State) => state.switchMode);
    return (
        <MenuButton
            onClick={switchMode}
            icon={theme.palette.mode === "dark" ? <Brightness7/> : <Brightness4/>}
            tooltip={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
        />
    );
}
