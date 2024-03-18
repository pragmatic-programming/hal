import React from "react";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { ReactFlowInstance, useReactFlow } from "reactflow";
import { Theme, useTheme } from "@mui/material";
import EditorHeader, { editorHeaderHeight } from "./EditorHeader";
import { StateEditorOpen } from "../../state/editor/StateEditor";
import EditorFooter, { editorFooterHeight } from "./EditorFooter";
import { EditorBody } from "./EditorBody";
import { NodeData } from "../../model/node/NodeData";
import { StrictNode, strictNode } from "../../model/node/StrictNode";
import { ButtonIcon } from "../util/ButtonIcon";
import InsertDriveFile from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { BoxBackgroundLight } from "../util/BoxBackgroundLight";

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
    const reactFlow: ReactFlowInstance = useReactFlow();
    const theme: Theme = useTheme();
    const node: StrictNode<NodeData> = strictNode(reactFlow.getNode(props.editorState.nodeId));
    if (node.data.type !== "editor") {
        throw new Error("Node has wrong type");
    }
    return (
        <BoxBackgroundLight
            style={{
                borderColor: theme.palette.info.light,
                borderStyle: "solid",
                borderWidth: editorFullSizeBorderWidth,
                height: "calc(100vh - " + editorFullSizeReducedHeight + "px)",
                position: "fixed",
                width: "calc(100vw - " + editorFullSizeReducedWidth + "px)",
            }}
        >
            <EditorHeader
                nodeId={props.editorState.nodeId}
                onChange={(value: string) => editorOpenSetLabel(value)}
                value={props.editorState.label}
                iconLeft={
                    <ButtonIcon
                        iconDefault={InsertDriveFile}
                        iconHover={DeleteIcon}
                        onClick={(): void => {
                            reactFlow.deleteElements({nodes: [{id: props.editorState.nodeId}]});
                            openEditor(reactFlow.getNode, undefined);
                        }}
                        size={"medium"}
                        tooltip={"Delete Editor Node"}
                    />
                }
                iconRight={
                    <ButtonIcon
                        iconDefault={CloseFullscreenIcon}
                        onClick={() => openEditor(reactFlow.getNode, undefined)}
                        size={"medium"}
                        tooltip={"Exit Fullscreen"}
                    />
                }
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
                nodeId={node.id}
            />
        </BoxBackgroundLight>
    );
}
