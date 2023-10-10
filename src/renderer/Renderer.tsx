import React, { useState } from "react";
import { Canvas } from "../model/Canvas";
import "./Renderer.scss";
import SvgRenderer from "./svg/SvgRenderer";
import HtmlRenderer from "./html/HtmlRenderer";
import { Editor } from "../model/Editor";
import { Dimension } from "../model/Dimension";
import { Position } from "../model/Position";

interface Props {
    canvas: Canvas;
}

export default function Renderer(props: Props): JSX.Element {
    const [items, setItems] = useState(props.canvas);
    return (
        <div>
            <button onClick={() => {
                setItems(items.addEditor(
                    new Editor(
                        3,
                        new Dimension(640, 480),
                        new Position(0, 0),
                        "javascript",
                        "alert('Hello '+ x)"
                    ),
                ));
            }}>Test
            </button>
            <div>
                <HtmlRenderer editors={items.editors}/>
                <SvgRenderer editors={items.editors}/>
            </div>
        </div>
    );
}
