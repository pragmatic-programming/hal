import React, { CSSProperties } from "react";
import HtmlRenderer from "../renderer/html/HtmlRenderer";
import SvgRenderer from "../renderer/svg/SvgRenderer";
import { Canvas } from "../model/Canvas";
import { useTheme } from "@mui/material";

interface Props {
    canvas: Canvas;
    highlightedEditorId: number | null;
    menuWidth: number;
    setHighlightedEditorId: (id: number) => void;
}

export default function Main(props: Props): React.JSX.Element {
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
            <HtmlRenderer
                editors={props.canvas.editors}
                highlightedEditorId={props.highlightedEditorId}
                leftOffset={props.menuWidth}
                setHighlightedEditorId={props.setHighlightedEditorId}
            />
            <SvgRenderer
                editors={props.canvas.editors}
                leftOffset={props.menuWidth}
            />
        </div>
    );
}
