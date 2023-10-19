import React, { ChangeEvent, CSSProperties, useCallback } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Editor as Monaco } from "@monaco-editor/react";
import { EditorHeader } from "./html/EditorHeader";
import { Theme, useTheme } from "@mui/material";

export default function TextUpdaterNode(props: NodeProps) {
    const onChange = useCallback((evt: ChangeEvent) => {
        console.log("foo");
    }, []);
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
                <EditorHeader
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
                    onChange={() => onChange}
                    // onChange={(value) => updateEditorValue(props.editor.id, value)}
                />
            </div>
            <Handle type="source" position={Position.Bottom} id="a"/>
        </>
    );
}
