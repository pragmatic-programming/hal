import React from "react";
import { EditorBody } from "../../editor/EditorBody";
import EditorHeader, { editorHeaderHeight } from "../../editor/EditorHeader";
import EditorFooter, { editorFooterHeight } from "../../editor/EditorFooter";
import { ButtonIcon } from "../../util/ButtonIcon";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { NodeProps, ReactFlowInstance, useReactFlow } from "reactflow";
import { NodeData } from "../../../model/node/NodeData";
import { Hide } from "../../util/Hide";

const editorBodyReducedWidth: number = 2;

export function NodeEditorBody(props: NodeProps<NodeData>): React.JSX.Element {
    if (props.data.type !== "editor") {
        throw new Error("Node.data has wrong type");
    }
    const reactFlow: ReactFlowInstance = useReactFlow();
    const openEditor = useStore((state: State) => state.editor.editorOpen);
    const setNodeNodeDataLabel = useStore((state: State) => state.flow.setNodeNodeDataLabel);
    const setNodeNodeDataContent = useStore((state: State) => state.flow.setNodeNodeDataContent);
    const verboseMode: boolean = useStore((state: State) => state.flow.mode !== "compact");
    let editorBodyReducedHeight: number = 0;
    if (verboseMode) {
        editorBodyReducedHeight = editorHeaderHeight + editorFooterHeight;
    }
    return (
        <>
            <Hide
                hide={!verboseMode}
            >
                <EditorHeader
                    value={props.data.label}
                    onChange={(label: string) => setNodeNodeDataLabel(props.id, label)}
                    nodeId={props.id}
                    iconLeft={
                        <ButtonIcon
                            iconDefault={InsertDriveFileIcon}
                            iconHover={DeleteIcon}
                            onClick={() => reactFlow.deleteElements({nodes: [{id: props.id}]})}
                            size={"medium"}
                            tooltip={"Delete Editor Node"}
                        />
                    }
                    iconRight={
                        <ButtonIcon
                            iconDefault={OpenInNewIcon}
                            onClick={() => openEditor(reactFlow.getNode, props.id)}
                            size={"medium"}
                            tooltip={"Open Fullscreen"}
                        />
                    }
                />
            </Hide>
            <EditorBody
                height={"calc(100% - " + editorBodyReducedHeight + "px)"}
                language={props.data.language}
                onChange={(content: string | undefined) => setNodeNodeDataContent(props.id, content)}
                value={props.data.content}
                width={"calc(100% - " + editorBodyReducedWidth + "px)"}
            />
            <Hide
                hide={!verboseMode}
            >
                <EditorFooter
                    nodeId={props.id}
                    language={props.data.language}
                />
            </Hide>
        </>
    );
}
