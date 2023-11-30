import { ComponentType } from "react";
import { NodeTypeIndicator } from "./NodeTypeIndicator";
import { NodeProps } from "reactflow";
import { SvgIconComponent } from "@mui/icons-material";
import { EdgeTypeIndicator } from "../edge/EdgeTypeIndicator";

export interface NodeDefinition {
    type: NodeTypeIndicator;
    icon: SvgIconComponent;
    component: ComponentType<NodeProps>;
    // new node (step 5): add edge type to every node definition
    // which can be connected by new edge
    sourceEdgeTypes: EdgeTypeIndicator[];
}
