import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { gui } from "../../constants";

interface Props {
    disabled?: boolean;
    icon: React.JSX.Element;
    onClick: () => void;
    tooltip: string;
}

export default function ButtonMenu(props: Props): React.JSX.Element {
    return (
        // todo sx and style equal?
        <Box
            sx={{
                height: 32,
                textAlign: "center",
                width: gui.menuWidth,
                marginTop: 2
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
