import React, { CSSProperties } from "react";
import { NodeProps } from "reactflow";
import { Theme, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import NodeData from "../../../model/NodeData";
import HandleTarget from "../handle/HandleTarget";
import HandleSource from "../handle/HandleSource";
import EditorHeader, { editorHeaderHeight } from "../../editor/EditorHeader";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import EditorFooter, { editorFooterHeight } from "../../editor/EditorFooter";
import { EditorBody } from "../../editor/EditorBody";

const editorBodyReducedWidth = 2;
const editorBodyReducedHeight = editorHeaderHeight + editorFooterHeight;

export default function NodeEditor(props: NodeProps<NodeData>): React.JSX.Element {
    if (!props.targetPosition) {
        throw new Error("TargetPosition is undefined");
    }
    if (!props.sourcePosition) {
        throw new Error("SourcePosition is undefined");
    }

    const theme: Theme = useTheme();
    const setNodeNodeData = useStore((state: State) => state.reactFlow.setNodeNodeData);

    const style: Partial<CSSProperties> = {
        borderColor: theme.palette.info.light,
        borderStyle: "solid",
        borderWidth: 1,
        width: 300,
        height: 300,
    };
    return (
        <BoxBackgroundMain
            style={style}
        >
            <HandleTarget
                nodeId={props.id}
                position={props.targetPosition}
            />
            <HandleSource
                id="execute"
                nodeId={props.id}
                position={props.sourcePosition}
            />
            <HandleSource
                id="sequence"
                nodeId={props.id}
                position={props.sourcePosition}
            />
            <EditorHeader
                value={props.data.label}
                onChange={(label: string) => setNodeNodeData(props.id, {label: label})}
                nodeId={props.id}
            />
            <EditorBody
                height={"calc(100% - " + editorBodyReducedHeight + "px)"}
                language={props.data.language}
                onChange={(content: string | undefined) => setNodeNodeData(props.id, {content: content})}
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
