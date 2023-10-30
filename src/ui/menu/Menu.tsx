import React from "react";
import { Theme, useTheme } from "@mui/material";
import ButtonPlay from "./ButtonPlay";
import { gui } from "../../constants";
import MenuLayout from "./MenuLayout";
import MenuDivider from "./MenuDivider";
import ButtonSwitchMode from "./ButtonSwitchMode";

export default function Menu(): React.JSX.Element {
    const theme: Theme = useTheme();
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: gui.menuWidth - 1, // subtract 1px which is added by borderRight
            height: "calc(100vh - " + gui.bottomHeight + "px)",
            backgroundColor: theme.palette.primary.main,
            borderRight: "1px solid " + theme.palette.primary.dark
        }}>
            <ButtonSwitchMode/>
            <MenuDivider/>
            <ButtonPlay/>
            <MenuDivider/>
            <MenuLayout/>
        </div>
    );
}
