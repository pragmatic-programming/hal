import React from "react";
import { Canvas } from "./model/Canvas";
import { Editor } from "./model/Editor";
import { Dimension } from "./model/Dimension";
import { Position } from "./model/Position";
import { Edge } from "./model/Edge";
import Renderer from "./renderer/Renderer";
import { EdgeStyle } from "./model/EdgeStyle";

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
    return (
        <Renderer canvas={canvas}/>
    );
}

