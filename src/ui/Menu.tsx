import React, { CSSProperties } from "react";
import { Position } from "../model/Position";
import { Dimension } from "../model/Dimension";
import { Editor } from "../model/Editor";
import { Divider, useTheme } from "@mui/material";
import { AddBox, Brightness4, Brightness7, IndeterminateCheckBox } from "@mui/icons-material";
import { useStore } from "../Store";
import { State } from "../State";
import MainButton from "./MainButton";

export default function Menu(): React.JSX.Element {
    const theme = useTheme();
    const highlightedEditorId: number | null = useStore((state: State) => state.highlightedEditorId);
    const switchMode = useStore((state: State) => state.switchMode);
    const removeEditor = useStore((state: State) => state.removeEditor);
    const addEditor = useStore((state: State) => state.addEditor);
    const menuWidth: number = useStore((state: State) => state.menuWidth);
    // todo all styles should be const
    const style: CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: menuWidth,
        height: "100vh",
        backgroundColor: theme.palette.background.paper,
        borderRight: "1px solid #363636"
    };
    return (
        <div style={style}>
            <MainButton
                onClick={switchMode}
                icon={theme.palette.mode === "dark" ? <Brightness7/> : <Brightness4/>}
            />
            <Divider sx={{marginTop: 2}}/>
            <MainButton
                onClick={
                    () => addEditor(
                        new Editor(
                            3,
                            new Dimension(640, 480),
                            new Position(0, 0),
                            "javascript",
                            "alert('Hello '+ x)"
                        )
                    )
                }
                icon={<AddBox fontSize="inherit"/>}
            />
            <MainButton
                onClick={removeEditor}
                disabled={highlightedEditorId === null}
                icon={<IndeterminateCheckBox fontSize="inherit"/>}
            />
        </div>
    );
}
