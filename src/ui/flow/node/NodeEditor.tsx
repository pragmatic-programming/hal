import React, { CSSProperties } from "react";
import { NodeProps } from "reactflow";
import { Editor as Monaco } from "@monaco-editor/react";
import { Theme, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import NodeData from "../../../model/NodeData";
import HandleTarget from "../handle/HandleTarget";
import HandleSource from "../handle/HandleSource";
import EditorHeader from "../../editor/EditorHeader";
import { BoxBackgroundMain } from "../../BoxBackgroundMain";
import EditorFooter from "../../editor/EditorFooter";

export default function NodeEditor(props: NodeProps<NodeData>): React.JSX.Element {
    const theme: Theme = useTheme();
    const setNodeValue = useStore((state: State) => state.setNodeValue);
    const setNodeLabel = useStore((state: State) => state.setNodeLabel);

    const style: Partial<CSSProperties> = {
        borderColor: theme.palette.info.light,
        borderStyle: "solid",
        borderWidth: 1,
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
            <Monaco
                defaultLanguage={"javascript"}
                height={300}
                onChange={(value: string | undefined) => setNodeValue(props.id, value)}
                options={{minimap: {enabled: false}}}
                value={props.data.content}
            />
            <EditorFooter
                language={props.data.language}
            />
        </BoxBackgroundMain>
    );
}
