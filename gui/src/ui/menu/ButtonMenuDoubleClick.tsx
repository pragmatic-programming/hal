import React, { useRef } from "react";
import useDoubleClick from 'use-double-click';
import { Box, IconButton, Tooltip } from "@mui/material";
import { menuWidth } from "./Menu";

interface Props {
    disabled?: boolean;
    icon: React.JSX.Element;
    onClick: () => void;
    onDoubleClick: () => void;
    tooltip: string;
}

export default function ButtonMenuDoubleClick(props: Props): React.JSX.Element {
    // see https://www.timellenberger.com/libraries/use-double-click
    const buttonRef = useRef(null);
    useDoubleClick({
        /** A callback function for single click events */
        onSingleClick: e => props.onClick(),
        /** A callback function for double click events */
        onDoubleClick: e => props.onDoubleClick(),
        /** (Required) Dom node to watch for double clicks */
        ref: buttonRef,
        /**
         * The amount of time (in milliseconds) to wait
         * before differentiating a single from a double click
         */
        latency: 200
    });
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
                    ref={buttonRef}
                    disabled={props.disabled}
                    size="large"
                >
                    {props.icon}
                </IconButton>
            </Tooltip>
        </Box>
    );
}
