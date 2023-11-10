import React from "react";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { Node, useReactFlow } from "reactflow";
import { IconButton, Theme, useTheme } from "@mui/material";
import EditorHeader, { editorHeaderHeight } from "./EditorHeader";
import { Close } from "@mui/icons-material";
import { StateEditorOpen } from "../../state/editor/StateEditor";
import { BoxBackgroundMain } from "../util/BoxBackgroundMain";
import EditorFooter, { editorFooterHeight } from "./EditorFooter";
import { EditorBody } from "./EditorBody";
import { NodeData } from "../../model/node/NodeData";

interface Props {
    editorState: StateEditorOpen;
}

const editorFullSizeBorderWidth = 2;
const editorFullSizeReducedHeight = editorFullSizeBorderWidth * 2;
const editorFullSizeReducedWidth = editorFullSizeBorderWidth * 2;
const editorBodyReducedWidth = editorFullSizeBorderWidth * 2 + editorFooterHeight + editorHeaderHeight;
const editorBodyReducedHeight = editorFullSizeReducedHeight * 2;

export default function EditorFullSize(props: Props): React.JSX.Element {
    const editorOpenSetLabel = useStore((state: State) => state.editor.editorLabelSet);
    const editorOpenSetContent = useStore((state: State) => state.editor.editorContentSet);
    const openEditor = useStore((state: State) => state.editor.editorOpen);
    const {getNode} = useReactFlow();
    const theme: Theme = useTheme();
    let node: Node<NodeData> | undefined = getNode(props.editorState.nodeId);
    if (!node) {
        throw new Error("Node is undefined");
    }
    if(node.data.type !== "editor"){
        throw new Error("Node has wrong type");
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
                nodeId={props.editorState.nodeId}
                onChange={(value: string) => editorOpenSetLabel(value)}
                value={props.editorState.label}
            />
            <EditorBody
                height={"calc(100vh - " + editorBodyReducedWidth + "px)"}
                language={node.data.language}
                onChange={(value: string | undefined) => editorOpenSetContent(value)}
                value={node.data.content}
                width={"calc(vw - " + editorBodyReducedHeight + "px)"}
            />
            <EditorFooter
                nodeId={node.id}
                language={node.data.language}
            />
        </BoxBackgroundMain>
    );
}
