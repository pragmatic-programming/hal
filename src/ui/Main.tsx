import React, { CSSProperties } from "react";
import HtmlRenderer from "../renderer/html/HtmlRenderer";
import SvgRenderer from "../renderer/svg/SvgRenderer";
import { useTheme } from "@mui/material";
import { useStore } from "../Store";
import { State } from "../State";

export default function Main(): React.JSX.Element {
    const theme = useTheme();
    const menuWidth: number = useStore((state: State) => state.menuWidth);
    const style: CSSProperties = {
        backgroundColor: theme.palette.gui.canvas.background,
        height: "100vh",
        left: menuWidth,
        position: "fixed",
        top: 0,
        width: window.innerWidth - menuWidth,
    };
    return (
        <div style={style}>
            <HtmlRenderer/>
            <SvgRenderer/>
        </div>
    );
}
