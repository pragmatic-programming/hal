import React from "react";
import { BoxBackgroundMain } from "../../../../util/BoxBackgroundMain";
import { ButtonIconDynamic } from "../../../../util/ButtonIconDynamic";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactFlowInstance, useReactFlow } from "reactflow";
import { SvgIconComponent } from "@mui/icons-material";

interface Props {
    icon: SvgIconComponent;
    id: string;
    tooltip: string;
    width?: number;
}

export function EdgeDefaultLabelIcon(props: Props): React.JSX.Element {
    const reactFlow: ReactFlowInstance = useReactFlow();
    return (
        <BoxBackgroundMain
            style={{width: props.width}}
        >
            <ButtonIconDynamic
                iconDefault={props.icon}
                iconHover={DeleteIcon}
                onClick={() => reactFlow.deleteElements({edges: [{id: props.id}]})}
                size={"medium"}
                tooltip={props.tooltip}
            />
        </BoxBackgroundMain>
    );
}
