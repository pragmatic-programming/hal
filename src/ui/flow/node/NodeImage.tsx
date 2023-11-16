import React from "react";
import { NodeProps, NodeResizer, useReactFlow } from "reactflow";
import { NodeDataImage } from "../../../model/node/NodeData";
import { Theme, useTheme } from "@mui/material";
import { borderColor } from "../../../util";
import HandleTargetLeft from "../handle/HandleTargetLeft";
import NodeImageDefault from "./NodeImageDefault";
import HandleTargetTop from "../handle/HandleTargetTop";
import { strictNode } from "../../../model/node/StrictNode";

export default function NodeImage(props: NodeProps<NodeDataImage>): React.JSX.Element {
    const reactFlow = useReactFlow();
    const node = strictNode(reactFlow.getNode(props.id));
    const theme: Theme = useTheme();
    let img: React.JSX.Element = (
        <NodeImageDefault
            borderColor={borderColor(props, theme, theme.palette.primary.main)}
            width={props.data.width}
            height={props.data.height}
        />
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
            <HandleTargetTop
                nodeId={props.id}
            />
            <HandleTargetLeft
                nodeId={props.id}
            />
            {img}
        </>
    );
}
