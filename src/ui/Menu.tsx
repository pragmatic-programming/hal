import React, { CSSProperties } from "react";
import { Position } from "../model/Position";
import { Dimension } from "../model/Dimension";
import { Editor } from "../model/Editor";
import { Divider, Theme, useTheme } from "@mui/material";
import { AddBox, Brightness4, Brightness7, IndeterminateCheckBox, TrendingFlat } from "@mui/icons-material";
import { useStore } from "../Store";
import { State } from "../State";
import MenuButton from "./MenuButton";

export default function Menu(): React.JSX.Element {
    const theme: Theme = useTheme();
    const firstEditorIsNotSelected: boolean = useStore((state: State) => state.highlightedEditor.first === null);
    const notBothEditorsAreSelected: boolean = useStore((state: State) => state.highlightedEditor.first === null || state.highlightedEditor.second === null);
    const switchMode = useStore((state: State) => state.switchMode);
    const removeEditor = useStore((state: State) => state.removeEditor);
    const addEditor = useStore((state: State) => state.addEditor);
    const addEdge = useStore((state: State) => state.addEdge);
    const menuWidth: number = useStore((state: State) => state.menuWidth);
    // todo all styles should be const
    const style: CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: menuWidth - 1, // subtract 1px which is added by borderRight
        height: "100vh",
        backgroundColor: theme.palette.gui.menu.background,
        borderRight: "1px solid " + theme.palette.gui.menu.border
    };
    return (
        <div style={style}>
            <MenuButton
                onClick={switchMode}
                icon={theme.palette.mode === "dark" ? <Brightness7/> : <Brightness4/>}
            />
            <Divider sx={{marginTop: 2}}/>
            <MenuButton
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
            <MenuButton
                onClick={removeEditor}
                disabled={firstEditorIsNotSelected}
                icon={<IndeterminateCheckBox fontSize="inherit"/>}
            />
            <MenuButton
                onClick={addEdge}
                disabled={notBothEditorsAreSelected}
                icon={<TrendingFlat fontSize="inherit"/>}
            />
        </div>
    );
}
