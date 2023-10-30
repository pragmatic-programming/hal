import React, { CSSProperties } from "react";
import { NodeProps } from "reactflow";
import { Editor as Monaco } from "@monaco-editor/react";
import { Theme, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import NodeData from "../../../model/NodeData";
import HandleTarget from "../handle/HandleTarget";
import HandleSource from "../handle/HandleSource";
import EditorNodeHeader from "./EditorNodeHeader";

export default function NodeEditor(props: NodeProps<NodeData>): React.JSX.Element {
    const theme: Theme = useTheme();
    const setNodeValue = useStore((state: State) => state.setNodeValue);
    const setNodeLabel = useStore((state: State) => state.setNodeLabel);

    const style: Partial<CSSProperties> = {
        borderColor: theme.palette.info.light,
        borderStyle: "solid",
        borderWidth: 1,
        background: theme.palette.primary.main,
    };

    return (
        <div
            style={style}
        >
            <HandleTarget
                style={{top: 100}}
            />
            <HandleSource
                id="execute"
                style={{top: 100}}
            />
            <HandleSource
                id="sequence"
                style={{top: 200}}
            />
            <EditorNodeHeader
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
        </div>
    );
}
