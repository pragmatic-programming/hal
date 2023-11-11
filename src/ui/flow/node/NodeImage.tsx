import React, { CSSProperties } from "react";
import { NodeProps } from "reactflow";
import HandleTarget from "../handle/HandleTarget";
import { NodeDataImage } from "../../../model/node/NodeData";
import ImageIcon from "@mui/icons-material/Image";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { IconButton } from "@mui/material";

export default function NodeImage(props: NodeProps<NodeDataImage>): React.JSX.Element {
    if (!props.targetPosition) {
        throw new Error("TargetPosition is undefined");
    }
    const size: CSSProperties = {width: props.data.width, height: props.data.height};
    const padding: CSSProperties = {padding: 10};
    let img = <BoxBackgroundMain style={padding}>
        <IconButton style={padding}>
            <ImageIcon style={size}/>
        </IconButton>
    </BoxBackgroundMain>;
    if (props.data.content && props.data.content.length > 0) {
        img = <img
            style={{width: props.data.width, height: props.data.height}}
            src={props.data.content}
            alt={props.id}
        />;
    }
    return (
        <>
            <HandleTarget
                nodeId={props.id}
                position={props.targetPosition}
            />
            {img}
        </>
    );
}
