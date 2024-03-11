import React, { CSSProperties } from "react";
import { NodeProps } from "reactflow";
import HandleTargetTop from "../handle/HandleTargetTop";
import HandleTargetLeft from "../handle/HandleTargetLeft";
import HandleSourceRight from "../handle/HandleSourceRight";
import HandleSourceBottom from "../handle/HandleSourceBottom";
import { NodeDataHierarchy } from "../../../model/node/NodeData";
import { Theme, useTheme } from "@mui/material";
import { BoxBackgroundDark } from "../../util/BoxBackgroundDark";

export default function NodeHierarchy(props: NodeProps<NodeDataHierarchy>): React.JSX.Element {
    const theme: Theme = useTheme();
    const style: CSSProperties = {
        borderColor: theme.palette.primary.light,
        borderStyle: "solid",
        borderWidth: 1,
        width: props.data.width,
        height: props.data.height,
        // set zIndex (lower than the zIndex of edges)
        // so that edges "inside" of hierarchy nodes are visible
        zIndex: props.zIndex
    };
    return (
        <BoxBackgroundDark
            style={style}
        >
            <HandleTargetTop
                nodeId={props.id}
            />
            <HandleTargetLeft
                nodeId={props.id}
            />
            <HandleSourceRight
                nodeId={props.id}
            />
            <HandleSourceBottom
                nodeId={props.id}
            />
        </BoxBackgroundDark>
    );
}
