import React, { CSSProperties } from "react";
import { Typography } from "@mui/material";

interface Props {
    menuWidth: number;
}

export default function Bottom(props: Props): JSX.Element {
    let style: CSSProperties = {
        position: "fixed",
        bottom: 0,
        left: props.menuWidth,
        width: window.innerWidth - props.menuWidth,
        height: 200,
        borderTop: "1px solid #363636",
        backgroundColor: "#1e1e1e",
    };
    return (
        <div style={style}>
            <Typography mt={2} color="secondary">KICO</Typography>
        </div>
    );
}
