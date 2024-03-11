import { ComponentType, CSSProperties } from "react";
import { EdgeProps } from "@reactflow/core/dist/esm/types/edges";
import { SvgIconComponent } from "@mui/icons-material";
import { TransformationProcessor } from "@pragmatic-programming/ihgraph";
import { NodeTypeIndicator } from "../node/NodeTypeIndicator";
import { EdgePathStyle } from "./EdgePathStyle";
import { EdgeTypeIndicator } from "./EdgeTypeIndicator";

export interface EdgeDefinition {
    type: EdgeTypeIndicator;
    animated: boolean;
    bidirectional: boolean;
    component: ComponentType<EdgeProps>;
    edgePathStyle: EdgePathStyle;
    icon: SvgIconComponent;
    immediate: boolean;
    priority: number;
    processor: typeof TransformationProcessor;
    style?: CSSProperties;
    targetNodeTypes: NodeTypeIndicator[];
}
