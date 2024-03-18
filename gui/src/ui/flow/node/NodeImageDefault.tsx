import React, { CSSProperties } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { BoxBorder } from "../../util/BoxBorder";
import { ButtonIconDynamic } from "../../util/ButtonIconDynamic";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactFlowInstance, useReactFlow } from "reactflow";

interface Props {
    borderColor: string,
    nodeId: string,
}

const padding: CSSProperties = {padding: 30};

export default function NodeImageDefault(props: Props): React.JSX.Element {
    const reactFlow: ReactFlowInstance = useReactFlow();
    return (
        <BoxBorder
            borderColor={props.borderColor}
        >
            <BoxBackgroundMain style={padding}>
                <ButtonIconDynamic
                    iconDefault={ImageIcon}
                    iconHover={DeleteIcon}
                    onClick={() => reactFlow.deleteElements({nodes: [{id: props.nodeId}]})}
                    size={"medium"}
                    tooltip={"Delete Image Node"}
                />
            </BoxBackgroundMain>
        </BoxBorder>
    );
}
