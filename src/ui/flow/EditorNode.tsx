import React, { CSSProperties } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Editor as Monaco } from "@monaco-editor/react";
import { EditorNodeHeader } from "./EditorNodeHeader";
import { Theme, useTheme } from "@mui/material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import NodeData from "../../model/NodeData";

export default function EditorNode(props: NodeProps<NodeData>): React.JSX.Element {
    const theme: Theme = useTheme();
    const setNodeValue = useStore((state: State) => state.setNodeValue);

    const style: Partial<CSSProperties> = {
        borderColor: theme.palette.info.light,
        borderStyle: "solid",
        borderWidth: 1,
        background: theme.palette.gui.menu.background,
    };

    return (
        <>
            <Handle
                id="input"
                type="target"
                position={Position.Left}
            />
            <div
                style={style}
            >
                <EditorNodeHeader
                    nodeLabel={props.data.label}
                    nodeId={props.id}
                />
                <Monaco
                    defaultLanguage={"javascript"}
                    defaultValue={props.data.content}
                    onChange={(value: string | undefined) => {
                        setNodeValue(props.id, value);
                    }}
                    height={300}
                    options={{
                        minimap: {
                            enabled: false
                        }
                    }}
                />
            </div>
            <Handle
                id="execute"
                type="source"
                position={Position.Right}
                style={{top: 50}}
            />
            <Handle
                id="sequence"
                type="source"
                position={Position.Right}
                style={{top: 10}}
            />
        </>
    );
}
