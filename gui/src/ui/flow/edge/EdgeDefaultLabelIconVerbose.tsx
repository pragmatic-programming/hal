import React, { CSSProperties } from "react";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { IconDynamic } from "../../util/IconDynamic";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactFlowInstance, useReactFlow } from "reactflow";
import { SvgIconComponent } from "@mui/icons-material";

interface Props {
    icon: SvgIconComponent;
    id: string;
    style?: CSSProperties
}

export function EdgeDefaultLabelIconVerbose(props: Props): React.JSX.Element {
    const reactFlow: ReactFlowInstance = useReactFlow();
    return (
        <BoxBackgroundMain>
            <IconDynamic
                iconDefault={props.icon}
                iconHover={DeleteIcon}
                style={{padding: 0, height: 16, ...props.style}}
                iconStyle={{padding: 0, width: 16, height: 16, marginTop: -2}}
                onClick={() => reactFlow.deleteElements({edges: [{id: props.id}]})}
            />
        </BoxBackgroundMain>
    );
}
