import React, { CSSProperties } from "react";
import { NodeProps, NodeResizer, useReactFlow } from "reactflow";
import { NodeDataImage } from "../../../model/node/NodeData";
import ImageIcon from "@mui/icons-material/Image";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { IconButton, Theme, useTheme } from "@mui/material";
import { borderColor } from "../../../util";
import { BoxBorder } from "../../util/BoxBorder";
import HandleTargetLeft from "../handle/HandleTargetLeft";

export default function NodeImage(props: NodeProps<NodeDataImage>): React.JSX.Element {
    const reactFlow = useReactFlow();
    const node = reactFlow.getNode(props.id);
    if (!node) {
        throw new Error("Node is undefined");
    }
    if (!node.height) {
        throw new Error("Node.height is undefined");
    }
    if (!node.width) {
        throw new Error("Node.width is undefined");
    }
    const padding: CSSProperties = {padding: 10};
    const theme: Theme = useTheme();
    let img: React.JSX.Element = (
        <BoxBorder
            borderColor={borderColor(props, theme, theme.palette.primary.main)}
        >
            <BoxBackgroundMain style={padding}>
                <IconButton style={padding}>
                    <ImageIcon style={{width: props.data.width, height: props.data.height}}/>
                </IconButton>
            </BoxBackgroundMain>
        </BoxBorder>
    );
    if (props.data.content && props.data.content.length > 0) {
        img = (
            <div
                style={{
                    width: node.width,
                    height: node.height,
                }}
            >
                <NodeResizer
                    isVisible={props.selected}
                    keepAspectRatio={true}
                    lineStyle={{borderColor: borderColor(props, theme, theme.palette.info.light)}}
                    maxHeight={props.data.height}
                    maxWidth={props.data.width}
                />
                <img
                    style={{width: "100%"}}
                    src={props.data.content}
                    alt={props.id}
                />
            </div>
        );
    }
    return (
        <>
            <HandleTargetLeft
                nodeId={props.id}
            />
            {img}
        </>
    );
}
