import React from "react";
import { NodeProps, NodeResizer, useReactFlow } from "reactflow";
import { NodeData, NodeDataImage } from "../../../model/node/NodeData";
import { Theme, useTheme } from "@mui/material";
import { borderColor } from "../../../util";
import HandleTargetLeft from "../handle/HandleTargetLeft";
import NodeImageDefault from "./NodeImageDefault";
import HandleTargetTop from "../handle/HandleTargetTop";
import { StrictNode, strictNode } from "../../../model/node/StrictNode";

export default function NodeImage(props: NodeProps<NodeDataImage>): React.JSX.Element {
    const node: StrictNode<NodeData> = strictNode(useReactFlow().getNode(props.id));
    const theme: Theme = useTheme();
    let img: React.JSX.Element = (
        <NodeImageDefault
            borderColor={borderColor(props.data.status, props.selected, theme, theme.palette.primary.main)}
            nodeId={props.id}
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
                    lineStyle={{borderColor: borderColor(props.data.status, props.selected, theme, theme.palette.info.light)}}
                    maxHeight={props.data.height}
                    maxWidth={props.data.width}
                />
                <img
                    alt={props.id}
                    src={props.data.content}
                    style={{width: "100%"}}
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
