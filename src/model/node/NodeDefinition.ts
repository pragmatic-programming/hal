import { ComponentType } from "react";
import { NodeTypeIndicator } from "./NodeTypeIndicator";
import { NodeProps } from "reactflow";
import { SvgIconComponent } from "@mui/icons-material";

export interface NodeDefinition {
    type: NodeTypeIndicator;
    icon: SvgIconComponent;
    component: ComponentType<NodeProps>;
}
