import React, { CSSProperties } from "react";
import { Divider, Theme, useTheme } from "@mui/material";
import { useStore } from "../Store";
import { State } from "../State";
import RemoveEditorButton from "./RemoveEditorButton";
import AddEditorButton from "./AddEditorButton";
import AddEdgeButton from "./AddEdgeButton";
import SwitchModeButton from "./SwitchModeButton";
import SwitchLockedButton from "./SwitchLockedButton";
import PlayButton from "./PlayButton";

export default function Menu(): React.JSX.Element {
    const theme: Theme = useTheme();
    const menuWidth: number = useStore((state: State) => state.menuWidth);
    const bottomHeight: number = useStore((state: State) => state.bottomHeight);
    const style: CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: menuWidth - 1, // subtract 1px which is added by borderRight
        height: "calc(100vh - " + bottomHeight + "px)",
        backgroundColor: theme.palette.gui.menu.background,
        borderRight: "1px solid " + theme.palette.gui.menu.border
    };
    return (
        <div style={style}>
            <SwitchModeButton/>
            <Divider sx={{marginTop: 2}}/>
            <AddEditorButton/>
            <RemoveEditorButton/>
            <AddEdgeButton/>
            <SwitchLockedButton/>
            <PlayButton/>
        </div>
    );
}
