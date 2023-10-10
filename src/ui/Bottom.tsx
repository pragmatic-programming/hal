import React, { CSSProperties } from "react";
import { Typography, useTheme } from "@mui/material";

interface Props {
    menuWidth: number;
}

export default function Bottom(props: Props): JSX.Element {
    const theme = useTheme();
    const style: CSSProperties = {
        position: "fixed",
        bottom: 0,
        left: props.menuWidth,
        width: window.innerWidth - props.menuWidth,
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
