import React from "react";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { IconDynamic } from "../../util/IconDynamic";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactFlowInstance, useReactFlow } from "reactflow";
import { SvgIconComponent } from "@mui/icons-material";

interface Props {
    icon: SvgIconComponent;
    id: string;
}

export function EdgeDefaultLabelIcon(props: Props): React.JSX.Element {
    const reactFlow: ReactFlowInstance = useReactFlow();
    return (
        <BoxBackgroundMain>
            <IconDynamic
                iconDefault={props.icon}
                iconHover={DeleteIcon}
                onClick={() => reactFlow.deleteElements({edges: [{id: props.id}]})}
            />
        </BoxBackgroundMain>
    );
}
