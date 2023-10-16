import React, { CSSProperties } from "react";
import HtmlRenderer from "../../renderer/html/HtmlRenderer";
import SvgRenderer from "../../renderer/svg/SvgRenderer";
import { Theme, useTheme } from "@mui/material";
import { gui } from "../../constants";

export default function Main(): React.JSX.Element {
    const theme: Theme = useTheme();
    const style: CSSProperties = {
        backgroundColor: theme.palette.gui.canvas.background,
        height: "100vh",
        left: gui.menuWidth,
        position: "fixed",
        top: 0,
        width: window.innerWidth - gui.menuWidth,
    };
    return (
        // todo use html5 semantic tags everywhere
        <main style={style}>
            <HtmlRenderer/>
            <SvgRenderer/>
        </main>
    );
}
