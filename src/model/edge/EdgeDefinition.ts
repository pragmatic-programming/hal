import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import { ComponentType, CSSProperties } from "react";
import { EdgeProps } from "@reactflow/core/dist/esm/types/edges";
import { SvgIconComponent } from "@mui/icons-material";
import { TransformationProcessor } from "ihgraph";
import { NodeTypeIndicator } from "../node/NodeTypeIndicator";

export interface EdgeDefinition {
    type: EdgeTypeIndicator;
    animated: boolean;
    component: ComponentType<EdgeProps>;
    icon: SvgIconComponent;
    immediate: boolean;
    processor: typeof TransformationProcessor;
    priority: number;
    requiresLabel: boolean;
    style?: CSSProperties;
    targetNodeTypes: NodeTypeIndicator[]
    transformationDirection?: "controlflow" | "dependency";
}
