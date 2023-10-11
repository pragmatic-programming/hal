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
        position: "fixed",
        top: 0,
        left: menuWidth,
        width: window.innerWidth - menuWidth,
        height: "100vh",
        backgroundColor: theme.palette.background.default
    };
    return (
        <div style={style}>
            <HtmlRenderer/>
            <SvgRenderer/>
        </div>
    );
}
