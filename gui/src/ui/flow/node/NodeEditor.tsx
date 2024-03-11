import React from "react";
import { NodeProps, NodeResizer, ReactFlowInstance, useReactFlow } from "reactflow";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import EditorHeader, { editorHeaderHeight } from "../../editor/EditorHeader";
import EditorFooter, { editorFooterHeight } from "../../editor/EditorFooter";
import { EditorBody } from "../../editor/EditorBody";
import { NodeData } from "../../../model/node/NodeData";
import HandleTargetTop from "../handle/HandleTargetTop";
import HandleTargetLeft from "../handle/HandleTargetLeft";
import HandleSourceRight from "../handle/HandleSourceRight";
import HandleSourceBottom from "../handle/HandleSourceBottom";
import { StrictNode, strictNode } from "../../../model/node/StrictNode";
import NodeEditorBorder from "./NodeEditorBorder";
import { Icon } from "../../util/Icon";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";


const editorBodyReducedWidth: number = 2;

export default function NodeEditor(props: NodeProps<NodeData>): React.JSX.Element {
    const openEditor = useStore((state: State) => state.editor.editorOpen);
    if (props.data.type !== "editor") {
        throw new Error("Node.data has wrong type");
    }
    const reactFlow: ReactFlowInstance = useReactFlow();
    const node: StrictNode<NodeData> = strictNode(reactFlow.getNode(props.id));
    const setNodeNodeDataLabel = useStore((state: State) => state.flow.setNodeNodeDataLabel);
    const setNodeNodeDataContent = useStore((state: State) => state.flow.setNodeNodeDataContent);
    const resizerIsVisible: boolean = props.selected;
    const verboseMode: boolean = useStore((state: State) => state.flow.verboseMode);
    let editorHeader = null;
    let editorFooter = null;
    let editorBodyReducedHeight: number = 0;
    if (verboseMode) {
        editorBodyReducedHeight = editorHeaderHeight + editorFooterHeight;
        editorHeader = <EditorHeader
            value={props.data.label}
            onChange={(label: string) => setNodeNodeDataLabel(props.id, label)}
            nodeId={props.id}
            iconLeft={
                <Icon
                    iconDefault={InsertDriveFileIcon}
                    iconHover={DeleteIcon}
                    onClick={() => reactFlow.deleteElements({nodes: [{id: props.id}]})}
                    tooltip={"Delete Editor Node"}
                />
            }
            iconRight={
                <Icon
                    iconDefault={OpenInNewIcon}
                    onClick={() => openEditor(reactFlow.getNode, props.id)}
                    tooltip={"Open Fullscreen"}
                />
            }
        />;
        editorFooter = <EditorFooter
            nodeId={props.id}
            language={props.data.language}
        />;
    }
    return (
        <NodeEditorBorder
            height={node.height}
            sourceNodeStatus={props.data.status}
            visible={!resizerIsVisible}
            width={node.width}
        >
            <NodeResizer
                isVisible={resizerIsVisible}
                minHeight={30}
                minWidth={100}
            />
            <HandleTargetTop
                nodeId={props.id}
            />
            <HandleTargetLeft
                nodeId={props.id}
            />
            <HandleSourceRight
                nodeId={props.id}
            />
            <HandleSourceBottom
                nodeId={props.id}
            />
            {editorHeader}
            <EditorBody
                height={"calc(100% - " + editorBodyReducedHeight + "px)"}
                language={props.data.language}
                onChange={(content: string | undefined) => setNodeNodeDataContent(props.id, content)}
                value={props.data.content}
                width={"calc(100% - " + editorBodyReducedWidth + "px)"}
            />
            {editorFooter}
        </NodeEditorBorder>
    );
}
