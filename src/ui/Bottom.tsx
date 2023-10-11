import React, { CSSProperties } from "react";
import { Typography, useTheme } from "@mui/material";
import { useStore } from "../Store";
import { State } from "../State";

export default function Bottom(): React.JSX.Element {
    const theme = useTheme();
    const menuWidth: number = useStore((state: State) => state.menuWidth);
    const style: CSSProperties = {
        position: "fixed",
        bottom: 0,
        left: menuWidth,
        width: window.innerWidth - menuWidth,
        height: 200,
        borderTop: "1px solid #363636",
        backgroundColor: theme.palette.background.default
    };
    return (
        <div style={style}>
            <Typography mt={2} color="primary">KICO</Typography>
        </div>
    );
}
