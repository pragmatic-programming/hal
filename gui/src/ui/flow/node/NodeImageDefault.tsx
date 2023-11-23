import React, { CSSProperties } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { BoxBorder } from "../../util/BoxBorder";
import { IconDynamic } from "../../util/IconDynamic";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactFlowInstance, useReactFlow } from "reactflow";

interface Props {
    borderColor: string,
    height: number,
    nodeId: string,
    width: number,
}

const padding: CSSProperties = {padding: 30};

export default function NodeImageDefault(props: Props): React.JSX.Element {
    const reactFlow: ReactFlowInstance = useReactFlow();
    return (
        <BoxBorder
            borderColor={props.borderColor}
        >
            <BoxBackgroundMain style={padding}>
                <IconDynamic
                    iconDefault={ImageIcon}
                    iconHover={DeleteIcon}
                    onClick={() => reactFlow.deleteElements({nodes: [{id: props.nodeId}]})}
                    tooltip={"Delete Image Node"}
                />
            </BoxBackgroundMain>
        </BoxBorder>
    );
}
