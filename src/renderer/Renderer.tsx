import React from "react";
import { Canvas } from "../model/Canvas";
import "./Renderer.scss";
import SvgRenderer from "./svg/SvgRenderer";
import HtmlRenderer from "./html/HtmlRenderer";

interface Props {
    canvas: Canvas;
}

export default function Renderer(props: Props): JSX.Element {
    return (
        <div>
            <div>
                <HtmlRenderer editors={props.canvas.editors}/>
                <SvgRenderer editors={props.canvas.editors}/>
            </div>
        </div>
    );
}
