import { ComponentType } from "react";
import { NodeTypeIndicator } from "./NodeTypeIndicator";
import { NodeProps } from "reactflow";

export interface NodeDefinition {
    type: NodeTypeIndicator;
    component: ComponentType<NodeProps>;
}
