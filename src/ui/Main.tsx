import React, { CSSProperties } from "react";
import HtmlRenderer from "../renderer/html/HtmlRenderer";
import SvgRenderer from "../renderer/svg/SvgRenderer";
import { Canvas } from "../model/Canvas";

interface Props {
    menuWidth: number;
    canvas: Canvas;
}

export default function Main(props: Props): JSX.Element {
    let style: CSSProperties = {
        position: "fixed",
        top: 0,
        left: props.menuWidth,
        width: window.innerWidth - props.menuWidth,
        height: "100vh",
        backgroundColor: "#1e1e1e",
    };
    return (
        <div style={style}>
            <HtmlRenderer leftOffset={props.menuWidth} editors={props.canvas.editors}/>
            <SvgRenderer leftOffset={props.menuWidth} editors={props.canvas.editors}/>
        </div>
    );
}
