import React, { CSSProperties } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Editor as Monaco } from "@monaco-editor/react";
import { EditorNodeHeader } from "./EditorNodeHeader";
import { Theme, useTheme } from "@mui/material";

export default function EditorNode(props: NodeProps) {
    const theme: Theme = useTheme();

    const style: Partial<CSSProperties> = {
        borderColor: theme.palette.info.light,
        borderStyle: "solid",
        borderWidth: 1,
        background: theme.palette.gui.menu.background,
    };

    return (
        <>
            <Handle type="target" position={Position.Top}/>
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
            <Handle type="source" position={Position.Bottom} id="a"/>
        </>
    );
}
