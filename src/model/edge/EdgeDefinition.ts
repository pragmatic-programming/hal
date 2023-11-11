import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import { ComponentType, CSSProperties } from "react";
import { EdgeProps } from "@reactflow/core/dist/esm/types/edges";
import { SvgIconComponent } from "@mui/icons-material";

export interface EdgeDefinition {
    type: EdgeTypeIndicator;
    component: ComponentType<EdgeProps>;
    icon: SvgIconComponent;
    animated: boolean;
    style?: CSSProperties;
}
