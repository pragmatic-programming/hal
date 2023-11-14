import { EdgeProps, getBezierPath, getSmoothStepPath, getStraightPath, NodeProps } from "reactflow";
import { EdgePathStyle } from "./state/reactFlow/EdgePathStyle";
import { Theme } from "@mui/material";
import { SourceNodeStatus } from "ihgraph";
import { LayoutOptions } from "elkjs/lib/elk-api";

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
        borderColor = theme.palette.info.light;
    }
    return borderColor;
}

export type LayoutOptionTypeIndicator = "horizontal" | "vertical" | "radial" | "force"

export function layoutOptions(layoutOptionType: LayoutOptionTypeIndicator): LayoutOptions {
    const layoutOption: LayoutOptions = {
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
        "elk.layered.spacing.nodeNodeBetweenLayers": "400",
        "elk.spacing.nodeNode": "400",
        "org.eclipse.elk.spacing.nodeNode": "30",
    };
    switch (layoutOptionType) {
        case "horizontal":
            return {
                ...layoutOption,
                "elk.algorithm": "layered",
                "elk.direction": "RIGHT"
            };
        case "vertical":
            return {
                ...layoutOption,
                "elk.algorithm": "layered",
                "elk.direction": "DOWN"
            };
        case "radial":
            return {
                ...layoutOption,
                "elk.algorithm": "org.eclipse.elk.radial",
                "elk.direction": "DOWN"
            };
        case "force":
            return {
                ...layoutOption,
                "elk.algorithm": "org.eclipse.elk.force",
                "elk.direction": "DOWN"
            };
    }
}
