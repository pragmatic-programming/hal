import React, { CSSProperties } from "react";
import { Position } from "../model/Position";
import { Dimension } from "../model/Dimension";
import { Editor } from "../model/Editor";
import { Box, Divider, IconButton, useTheme } from "@mui/material";
import { AddBox, Brightness4, Brightness7, IndeterminateCheckBox } from "@mui/icons-material";
import { useStore } from "../Store";
import { State } from "../State";

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
            <Box sx={{width: menuWidth, textAlign: "center", marginTop: 2}}>
                <IconButton
                    size="large"
                    onClick={switchMode}
                >
                    {theme.palette.mode === "dark" ? <Brightness7/> : <Brightness4/>}
                </IconButton>
            </Box>
            <Divider sx={{marginTop: 2}}/>
            <Box sx={{width: menuWidth, textAlign: "center", marginTop: 2}}>
                <IconButton
                    size="large"
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
                >
                    <AddBox fontSize="inherit"></AddBox>
                </IconButton>
            </Box>
            <Box sx={{width: menuWidth, textAlign: "center", marginTop: 2}}>
                <IconButton
                    disabled={highlightedEditorId === null}
                    size="large"
                    onClick={removeEditor}
                >
                    <IndeterminateCheckBox fontSize="inherit"></IndeterminateCheckBox>
                </IconButton>
            </Box>
        </div>
    );
}
