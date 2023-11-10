import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import { ComponentType, CSSProperties } from "react";
import { EdgeProps } from "@reactflow/core/dist/esm/types/edges";

export interface EdgeDefinition {
    type: EdgeTypeIndicator;
    component: ComponentType<EdgeProps>;
    animated: boolean;
    style?: CSSProperties;
}
