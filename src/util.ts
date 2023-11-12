import { EdgeProps, getBezierPath, getSmoothStepPath, getStraightPath, NodeProps } from "reactflow";
import { EdgePathStyle } from "./state/reactFlow/EdgePathStyle";
import { Theme } from "@mui/material";
import { SourceNodeStatus } from "ihgraph";

export function firstCharUpperCase(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getEdgePath(edgePathStyle: EdgePathStyle, props: EdgeProps) {
    let edgePath, labelX, labelY;
    switch (edgePathStyle) {
        case "Straight":
            [edgePath, labelX, labelY] = getStraightPath(props);
            break;
        case "Smooth":
            [edgePath, labelX, labelY] = getSmoothStepPath(props);
            break;
        default:
            [edgePath, labelX, labelY] = getBezierPath(props);
    }
    return {edgePath, labelX, labelY};
}

export function borderColor(
    props: NodeProps,
    theme: Theme,
    defaultBorderColor: string,
): string {
    let borderColor: string = defaultBorderColor;
    switch (props.data.status) {
        case SourceNodeStatus.ERROR:
            borderColor = theme.palette.error.main;
            break;
        case SourceNodeStatus.SUCCESS:
            borderColor = theme.palette.success.main;
            break;
        case SourceNodeStatus.WARNING:
            borderColor = theme.palette.warning.main;
            break;

    }
    if (props.selected) {
        borderColor = theme.palette.info.dark;
    }
    return borderColor;
}
