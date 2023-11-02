import React from "react";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { Node, useReactFlow } from "reactflow";
import NodeData from "../../model/NodeData";
import { IconButton, Theme, useTheme } from "@mui/material";
import EditorHeader, { editorHeaderHeight } from "./EditorHeader";
import { Close } from "@mui/icons-material";
import { EditorOpenState } from "../../state/substates/EditorOpenState";
import { BoxBackgroundMain } from "../util/BoxBackgroundMain";
import EditorFooter, { editorFooterHeight } from "./EditorFooter";
import { EditorBody } from "./EditorBody";

interface Props {
    editorOpen: EditorOpenState;
}

const editorFullSizeBorderWidth = 2;
const editorFullSizeReducedHeight = editorFullSizeBorderWidth * 2;
const editorFullSizeReducedWidth = editorFullSizeBorderWidth * 2;
const editorBodyReducedWidth = editorFullSizeBorderWidth * 2 + editorFooterHeight + editorHeaderHeight;
const editorBodyReducedHeight = editorFullSizeReducedHeight * 2;

export default function EditorFullSize(props: Props): React.JSX.Element {
    const editorOpenSetLabel = useStore((state: State) => state.editorOpenSetLabel);
    const editorOpenSetContent = useStore((state: State) => state.editorOpenSetContent);
    const openEditor = useStore((state: State) => state.openEditor);
    const label = useStore((state: State) => state.editorOpen?.label);
    const {getNode} = useReactFlow();
    const theme: Theme = useTheme();
    let node: Node<NodeData> | undefined = getNode(props.editorOpen.nodeId);
    if (!node) {
        throw new Error("Node is undefined");
    }
    return (
        <BoxBackgroundMain
            style={{
                position: "fixed",
                width: "calc(100vw - " + editorFullSizeReducedWidth + "px)",
                height: "calc(100vh - " + editorFullSizeReducedHeight + "px)",
                borderColor: theme.palette.info.light,
                borderStyle: "solid",
                borderWidth: editorFullSizeBorderWidth,
            }}
        >
            <IconButton
                style={{
                    position: "fixed",
                    top: 5,
                    right: 5,
                }}
                onClick={() => openEditor(getNode, undefined)}
            >
                <Close/>
            </IconButton>
            <EditorHeader
                nodeId={props.editorOpen.nodeId}
                onChange={(value: string) => editorOpenSetLabel(value)}
                value={label}
            />
            <EditorBody
                height={"calc(100vh - " + editorBodyReducedWidth + "px)"}
                language={node.data.language}
                onChange={(value: string | undefined) => editorOpenSetContent(value)}
                value={node.data.content}
                width={"calc(vw - " + editorBodyReducedHeight + "px)"}
            />
            <EditorFooter
                language={node.data.language}
            />
        </BoxBackgroundMain>
    );
}
