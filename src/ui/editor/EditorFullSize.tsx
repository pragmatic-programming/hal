import React from "react";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { Node, useReactFlow } from "reactflow";
import NodeData from "../../model/NodeData";
import { IconButton, Theme, useTheme } from "@mui/material";
import EditorHeader from "./EditorHeader";
import { Close } from "@mui/icons-material";
import { EditorOpenState } from "../../state/substates/EditorOpenState";
import { BoxBackgroundMain } from "../BoxBackgroundMain";
import EditorFooter from "./EditorFooter";
import { EditorBody } from "./EditorBody";

interface Props {
    editorOpen: EditorOpenState;
}

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
                width: "calc(100vw - 4px)",
                height: "calc(100vh - 4px)",
                borderColor: theme.palette.info.light,
                borderStyle: "solid",
                borderWidth: 2,
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
                onChange={(value: string) => {
                    editorOpenSetLabel(value);
                    console.log(value);
                }}
                nodeId={props.editorOpen.nodeId}
                value={label}
            />
            <EditorBody
                height="calc(100vh - 48px - 4px - 34px)"
                language={node.data.language}
                onChange={(value: string | undefined) => editorOpenSetContent(value)}
                value={node.data.content}
                width="calc(100vw - 4px)"
            />
            <EditorFooter
                language={node.data.language}
            />
        </BoxBackgroundMain>
    );
}
