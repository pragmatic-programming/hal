import React, { CSSProperties } from "react";
import { NodeProps, NodeResizer, useReactFlow } from "reactflow";
import { Theme, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import HandleTarget from "../handle/HandleTarget";
import HandleSource from "../handle/HandleSource";
import EditorHeader, { editorHeaderHeight } from "../../editor/EditorHeader";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import EditorFooter, { editorFooterHeight } from "../../editor/EditorFooter";
import { EditorBody } from "../../editor/EditorBody";
import { NodeData } from "../../../model/node/NodeData";
import { borderColor } from "../../../util";

const editorBodyReducedWidth = 2;
const editorBodyReducedHeight = editorHeaderHeight + editorFooterHeight;


export default function NodeEditor(props: NodeProps<NodeData>): React.JSX.Element {
    const sourcePosition = props.sourcePosition;
    if (!sourcePosition) {
        throw new Error("SourcePosition is undefined");
    }
    const {getNode,} = useReactFlow();
    const node = getNode(props.id);
    if (!node) {
        throw new Error("Node is undefined");
    }
    if (!node.height) {
        throw new Error("Node.height is undefined");
    }
    if (!node.width) {
        throw new Error("Node.width is undefined");
    }
    if (props.data.type !== "editor") {
        throw new Error("Node.data has wrong type");
    }
    const setNodeNodeDataLabel = useStore((state: State) => state.reactFlow.setNodeNodeDataLabel);
    const setNodeNodeDataContent = useStore((state: State) => state.reactFlow.setNodeNodeDataContent);
    const theme: Theme = useTheme();
    let handeStyle: CSSProperties = {};
    let lineStyle: CSSProperties = {
    borderColor: borderColor(props, theme, theme.palette.primary.dark),
    }
    // todo find a better solution than set the handleStyle
    if (!props.selected) {
        handeStyle = {
            width: 2,
            height: 2,
            backgroundColor: borderColor(props, theme, theme.palette.primary.dark),
            border: "none",
        };
    }
    return (
        <BoxBackgroundMain
            style={{
                width: node.width,
                height: node.height,
            }}
        >
            <NodeResizer
                handleStyle={handeStyle}
                lineStyle={lineStyle}
                minHeight={30}
                minWidth={100}
            />
            <HandleTarget
                nodeId={props.id}
                position={props.targetPosition}
            />
            <HandleSource
                nodeId={props.id}
                position={sourcePosition}
            />
            <EditorHeader
                value={props.data.label}
                onChange={(label: string) => setNodeNodeDataLabel(props.id, label)}
                nodeId={props.id}
            />
            <EditorBody
                height={"calc(100% - " + editorBodyReducedHeight + "px)"}
                language={props.data.language}
                onChange={(content: string | undefined) => setNodeNodeDataContent(props.id, content)}
                value={props.data.content}
                width={"calc(100% - " + editorBodyReducedWidth + "px)"}
            />
            <EditorFooter
                nodeId={props.id}
                language={props.data.language}
            />
        </BoxBackgroundMain>
    );
}
