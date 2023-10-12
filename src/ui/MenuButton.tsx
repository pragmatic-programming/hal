import React from "react";
import { Box, IconButton } from "@mui/material";
import { useStore } from "../Store";
import { State } from "../State";

interface Props {
    disabled?: boolean
    icon: React.JSX.Element
    onClick: () => void;
}

export default function MenuButton(props: Props): React.JSX.Element {
    const menuWidth: number = useStore((state: State) => state.menuWidth);
    return (
        <Box sx={{width: menuWidth, textAlign: "center", marginTop: 2}}>
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
