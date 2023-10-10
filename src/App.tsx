import React, { useState } from "react";
import { Canvas } from "./model/Canvas";
import { Editor } from "./model/Editor";
import { Dimension } from "./model/Dimension";
import { Position } from "./model/Position";
import { Edge } from "./model/Edge";
import { EdgeStyle } from "./model/EdgeStyle";
import "./App.scss";
import Menu from "./ui/Menu";
import Main from "./ui/Main";
import Bottom from "./ui/Bottom";
import Theme from "./ui/Theme";
import { PaletteMode } from "@mui/material";

const canvas = new Canvas(
        [
            new Editor(
                1,
                new Dimension(640, 480),
                new Position(5, 50),
                "javascript",
                "var x = 'World';",
                [
                    new Edge(
                        1,
                        2,
                        new Position(645, 100),
                        new Position(800, 100),
                        EdgeStyle.dotted
                    )
                ]
            ),
            new Editor(
                2,
                new Dimension(640, 480),
                new Position(800, 50),
                "javascript",
                "alert('Hello '+ x)"
            ),
        ],
    )
;

export default function App() {
    const [canvasState, setItems] = useState<Canvas>(canvas);
    const [mode, setMode] = useState<PaletteMode>("dark");
    const menuWidth = 100;
    return (
        <Theme mode={mode}>
            <Main
                menuWidth={menuWidth}
                canvas={canvasState}
            />
            <Bottom
                menuWidth={menuWidth}
            />
            <Menu
                menuWidth={menuWidth}
                newEditor={editor => setItems(canvasState.addEditor(editor))}
                setMode={setMode}
            />
        </Theme>
    );
}

