import React from "react";
import { Box } from "@mui/material";
import { menuWidth } from "./Menu";

interface Props {
    children: React.JSX.Element;
}

export default function MenuButtonBox(props: Props): React.JSX.Element {
    return (
        <Box
            style={{
                textAlign: "center",
                width: menuWidth,
            }}
        >
            {props.children}
        </Box>
    );
}
