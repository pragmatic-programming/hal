import { EdgeProps, getBezierPath, getSmoothStepPath, getStraightPath } from "reactflow";
import { EdgePathStyle } from "./state/reactFlow/EdgePathStyle";

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
