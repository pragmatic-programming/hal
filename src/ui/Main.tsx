import React, { CSSProperties } from "react";
import HtmlRenderer from "../renderer/html/HtmlRenderer";
import SvgRenderer from "../renderer/svg/SvgRenderer";
import { Canvas } from "../model/Canvas";
import { useTheme } from "@mui/material";

interface Props {
    menuWidth: number;
    canvas: Canvas;
}

export default function Main(props: Props): JSX.Element {
    const theme = useTheme();
    const style: CSSProperties = {
        position: "fixed",
        top: 0,
        left: props.menuWidth,
        width: window.innerWidth - props.menuWidth,
        height: "100vh",
        backgroundColor: theme.palette.background.default
    };
    return (
        <div style={style}>
            <HtmlRenderer leftOffset={props.menuWidth} editors={props.canvas.editors}/>
            <SvgRenderer leftOffset={props.menuWidth} editors={props.canvas.editors}/>
        </div>
    );
}
