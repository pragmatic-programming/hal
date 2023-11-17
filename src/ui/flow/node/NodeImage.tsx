import React from "react";
import { Edge, NodeProps, NodeResizer, useEdges, useReactFlow } from "reactflow";
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
    const edges = useEdges();
    const targetEdgeTop: Edge | undefined = edges.find(edge => edge.target === props.id && edge.targetHandle === "top");
    const targetEdgeLeft: Edge | undefined = edges.find(edge => edge.target === props.id && edge.targetHandle === "left");
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
                isConnected={targetEdgeTop !== undefined}
                nodeId={props.id}
            />
            <HandleTargetLeft
                isConnected={targetEdgeLeft !== undefined}
                nodeId={props.id}
            />
            {img}
        </>
    );
}
