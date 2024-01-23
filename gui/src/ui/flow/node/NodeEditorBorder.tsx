import React from "react";
import { Theme, useTheme } from "@mui/material";
import { borderColor } from "../../../util";
import { SimpleNodeStatus } from "ihgraph";
import { BoxBackgroundLight } from "../../util/BoxBackgroundLight";

interface Props {
    children: React.ReactNode;
    height: number;
    sourceNodeStatus: SimpleNodeStatus;
    visible: boolean;
    width: number;
}

export default function NodeEditorBorder(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    let width: number = props.width;
    let height: number = props.height;
    let border: "top-bottom-left-right" | undefined = undefined;
    if (props.visible) {
        // if we are not reducing the width and height by 2px when visible (border adds 2px for each dimension),
        // the node automatically grows when moved
        width -= 2;
        height -= 2;
        border = "top-bottom-left-right";
    }
    return (
        <BoxBackgroundLight
            borderColor={borderColor(props.sourceNodeStatus, !props.visible, theme, theme.palette.primary.main)}
            border={border}
            style={{
                width: width,
                height: height,
            }}
        >
            {props.children}
        </BoxBackgroundLight>
    );
}
