import {Theme} from "@mui/material";
import {SimpleNodeStatus} from "@pragmatic-programming/ihgraph";
import {LayoutOptions} from "elkjs/lib/elk-api";
import {XYPosition} from "reactflow";

export function firstCharUpperCase(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function borderColor(
    status: SimpleNodeStatus,
    selected: boolean,
    theme: Theme,
    defaultBorderColor: string,
): string {
    let borderColor: string = defaultBorderColor;
    switch (status) {
        case SimpleNodeStatus.ERROR:
            borderColor = theme.palette.error.main;
            break;
        case SimpleNodeStatus.SUCCESS:
            borderColor = theme.palette.success.main;
            break;
        case SimpleNodeStatus.WARNING:
            borderColor = theme.palette.warning.main;
            break;
    }
    if (selected) {
        borderColor = theme.palette.info.light;
    }
    return borderColor;
}

export type LayoutOptionTypeIndicator = "horizontal" | "vertical" | "radial" | "force"

export function layoutOptions(layoutOptionType: LayoutOptionTypeIndicator): LayoutOptions {
    const layoutOption: LayoutOptions = {
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
        "elk.layered.spacing.nodeNodeBetweenLayers": "200.0",
        "org.eclipse.elk.spacing.edgeNode": "80",
        "elk.spacing.nodeNode": "40",
        "org.eclipse.elk.spacing.nodeNode": "30",
        "org.eclipse.elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
        "org.eclipse.elk.layered.cycleBreaking.strategy": "DEPTH_FIRST",
        "org.eclipse.elk.layered.thoroughness": "100",
        // "org.eclipse.elk.layered.layering.strategy": "LONGEST_PATH",
        "org.eclipse.elk.layered.wrapping.strategy": "SINGLE_EDGE",
        "org.eclipse.elk.layered.wrapping.additionalEdgeSpacing": "0.0",
        "org.eclipse.elk.layered.wrapping.correctionFactor": "1.9",
        // "org.eclipse.elk.layered.compaction.postCompaction.strategy": "LEFT",
        // "org.eclipse.elk.layered.compaction.postCompaction.constraints": "QUADRATIC",
        "org.eclipse.elk.alignment": "RIGHT",
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

export function originOfCoordinates(): XYPosition {
    return {
        x: 0,
        y: 0,
    }
}