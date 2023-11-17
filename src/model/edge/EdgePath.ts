import { EdgePathStyle } from "./EdgePathStyle";
import { EdgeProps, getBezierPath, getSmoothStepPath, getStraightPath } from "reactflow";

export interface EdgePath {
    edgePath: string,
    labelX: number,
    labelY: number,
}

export function getEdgePath(edgePathStyle: EdgePathStyle, props: EdgeProps): EdgePath {
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
