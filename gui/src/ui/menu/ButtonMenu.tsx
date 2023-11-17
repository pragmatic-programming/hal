import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { menuWidth } from "./Menu";

interface Props {
    disabled?: boolean;
    icon: React.JSX.Element;
    onClick: () => void;
    tooltip: string;
}

export default function ButtonMenu(props: Props): React.JSX.Element {
    return (
        <Box
            style={{
                height: 32,
                marginTop: 16,
                textAlign: "center",
                width: menuWidth,
            }}
        >
            <Tooltip
                title={props.tooltip}
                placement={"right"}
            >
                <IconButton
                    disabled={props.disabled}
                    onClick={props.onClick}
                    size="large"
                >
                    {props.icon}
                </IconButton>
            </Tooltip>
        </Box>
    );
}
