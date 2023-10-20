import React, { CSSProperties } from "react";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";
import { Editor as Monaco } from "@monaco-editor/react";
import { EditorNodeHeader } from "./EditorNodeHeader";
import { Theme, useTheme } from "@mui/material";

export default function EditorNode(props: NodeProps): React.JSX.Element {
    const theme: Theme = useTheme();
    const {getNode} = useReactFlow();

    const style: Partial<CSSProperties> = {
        borderColor: theme.palette.info.light,
        borderStyle: "solid",
        borderWidth: 1,
        background: theme.palette.gui.menu.background,
    };

    return (
        <>
            <Handle type="target" position={Position.Left}/>
            <div
                style={style}
            >
                <EditorNodeHeader
                    language="javascript"
                />
                <Monaco
                    defaultLanguage={"javascript"}
                    defaultValue={props.data.value}
                    width={200}
                    height={300}
                    options={{
                        minimap: {
                            enabled: false
                        }
                    }}
                />
            </div>
            <Handle type="source" position={Position.Right} isValidConnection={connection => {
                if (!connection.target) {
                    return false;
                }
                if (!connection.source) {
                    return false;
                }
                if (connection.target === connection.source) {
                    return false;
                }
                const target = getNode(connection.target);
                if (!target) {
                    return false;
                }
                return target.type === "editorNode" || target.type === "resultNode";
            }}/>
        </>
    );
}
