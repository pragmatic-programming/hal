import React from "react";
import { Theme, useTheme } from "@mui/material";
import SwitchModeButton from "./SwitchModeButton";
import PlayButton from "./PlayButton";
import { gui } from "../../constants";
import MenuDivider from "./MenuDivider";
import LayoutMenu from "./LayoutMenu";

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
            <SwitchModeButton/>
            <MenuDivider/>
            <PlayButton/>
            <MenuDivider/>
            <LayoutMenu/>
        </div>
    );
}
