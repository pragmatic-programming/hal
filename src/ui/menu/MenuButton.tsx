import React from "react";
import { Box, IconButton } from "@mui/material";
import { gui } from "../../constants";

interface Props {
    disabled?: boolean;
    icon: React.JSX.Element;
    onClick: () => void;
}

export default function MenuButton(props: Props): React.JSX.Element {
    return (
        // todo sx and style equal?
        <Box sx={{
            height: 32,
            textAlign: "center",
            width: gui.menuWidth,
            marginTop: 2}}
        >
            <IconButton
                disabled={props.disabled}
                onClick={props.onClick}
                size="large"
            >
                {props.icon}
            </IconButton>
        </Box>
    );
}
