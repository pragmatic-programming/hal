import React from "react";
import { NodeProps } from "reactflow";
import HandleTarget from "../handle/HandleTarget";
import { NodeDataImage } from "../../../model/NodeData";
import ImageIcon from "@mui/icons-material/Image";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";

export default function NodeImage(props: NodeProps<NodeDataImage>): React.JSX.Element {
    if (!props.targetPosition) {
        throw new Error("TargetPosition is undefined");
    }
    const style = {width: props.data.width, height: props.data.height};
    let img = <BoxBackgroundMain style={style}><ImageIcon style={style}/></BoxBackgroundMain>;
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
