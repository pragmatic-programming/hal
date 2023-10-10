import React, { CSSProperties } from "react";
import { Position } from "../model/Position";
import { Dimension } from "../model/Dimension";
import { Editor } from "../model/Editor";
import { Box, Divider, IconButton, PaletteMode, useTheme } from "@mui/material";
import { AddBox, Brightness4, Brightness7, IndeterminateCheckBox } from "@mui/icons-material";

interface Props {
    menuWidth: number;
    newEditor: (editor: Editor) => void;
    removeEditor: (editorId: number | null) => void;
    setMode: (mode: PaletteMode) => void;
    highlightedEditorId: number | null;
}

export default function Menu(props: Props): React.JSX.Element {
    const theme = useTheme();
    let style: CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: props.menuWidth,
        height: "100vh",
        backgroundColor: theme.palette.background.paper,
        borderRight: "1px solid #363636"
    };
    return (
        <div style={style}>
            <Box sx={{width: props.menuWidth, textAlign: "center", marginTop: 2}}>
                <IconButton
                    size="large"
                    onClick={
                        () => {
                            props.setMode(theme.palette.mode === "dark" ? "light" : "dark");
                        }
                    }
                >
                    {theme.palette.mode === "dark" ? <Brightness7/> : <Brightness4/>}
                </IconButton>
            </Box>
            <Divider sx={{marginTop: 2}}/>
            <Box sx={{width: props.menuWidth, textAlign: "center", marginTop: 2}}>
                <IconButton
                    size="large"
                    onClick={
                        () => {
                            props.newEditor(
                                new Editor(
                                    3,
                                    new Dimension(640, 480),
                                    new Position(0, 0),
                                    "javascript",
                                    "alert('Hello '+ x)"
                                )
                            );
                        }
                    }
                >
                    <AddBox fontSize="inherit"></AddBox>
                </IconButton>
            </Box>
            <Box sx={{width: props.menuWidth, textAlign: "center", marginTop: 2}}>
                <IconButton
                    disabled={props.highlightedEditorId === null}
                    size="large"
                    onClick={() => props.removeEditor(props.highlightedEditorId)}
                >
                    <IndeterminateCheckBox fontSize="inherit"></IndeterminateCheckBox>
                </IconButton>
            </Box>
        </div>
    );
}
