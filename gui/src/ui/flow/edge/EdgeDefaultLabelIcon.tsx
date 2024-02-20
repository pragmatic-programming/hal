import React from "react";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { IconDynamic } from "../../util/IconDynamic";
import DeleteIcon from "@mui/icons-material/Delete";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import { ReactFlowInstance, useReactFlow } from "reactflow";

interface Props {
    edgeDefinition: EdgeDefinition;
    id: string;
}

export function EdgeDefaultLabelIcon(props: Props): React.JSX.Element {
    const reactFlow: ReactFlowInstance = useReactFlow();
    return (
        <BoxBackgroundMain>
            <IconDynamic
                iconDefault={props.edgeDefinition.icon}
                iconHover={DeleteIcon}
                onClick={() => reactFlow.deleteElements({edges: [{id: props.id}]})}
            />
        </BoxBackgroundMain>
    );
}
