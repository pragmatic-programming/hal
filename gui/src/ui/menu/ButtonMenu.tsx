import React from "react";
import { Box } from "@mui/material";
import { menuWidth } from "./Menu";
import TooltipIconButton from "../util/TooltipIconButton";

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
            <TooltipIconButton
                disabled={props.disabled}
                onClick={props.onClick}
                placement={"right"}
                size="large"
                title={props.tooltip}
            >
                {props.icon}
            </TooltipIconButton>
        </Box>
    );
}
