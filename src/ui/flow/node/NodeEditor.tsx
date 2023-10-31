import React, { CSSProperties } from "react";
import { NodeProps } from "reactflow";
import { Theme, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import NodeData from "../../../model/NodeData";
import HandleTarget from "../handle/HandleTarget";
import HandleSource from "../handle/HandleSource";
import EditorHeader from "../../editor/EditorHeader";
import { BoxBackgroundMain } from "../../BoxBackgroundMain";
import EditorFooter from "../../editor/EditorFooter";
import { EditorBody } from "../../editor/EditorBody";

export default function NodeEditor(props: NodeProps<NodeData>): React.JSX.Element {
    const theme: Theme = useTheme();
    const setNodeValue = useStore((state: State) => state.setNodeValue);
    const setNodeLabel = useStore((state: State) => state.setNodeLabel);

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
                style={{top: 100}}
                nodeId={props.id}
            />
            <HandleSource
                id="execute"
                nodeId={props.id}
                style={{top: 100}}
            />
            <HandleSource
                id="sequence"
                nodeId={props.id}
                style={{top: 200}}
            />
            <EditorHeader
                value={props.data.label}
                onChange={(content: string) => setNodeLabel(props.id, content)}
                nodeId={props.id}
            />
            <EditorBody
                height="calc(100% - 48px - 1px - 34px)"
                language={props.data.language}
                onChange={(value: string | undefined) => setNodeValue(props.id, value)}
                value={props.data.content}
                width="calc(100% - 2px)"
            />
            <EditorFooter
                language={props.data.language}
            />
        </BoxBackgroundMain>
    );
}
