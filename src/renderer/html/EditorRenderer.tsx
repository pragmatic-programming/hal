import React, { CSSProperties } from "react";
import { Editor } from "../../model/Editor";
import { Editor as Monaco } from "@monaco-editor/react";
import { useTheme } from "@mui/material";

interface Props {
    editor: Editor;
    highlightedEditorId: number | null;
    leftOffset: number;
    setHighlightedEditorId: (id: number) => void;
}

export function EditorRenderer(props: Props): JSX.Element {
    const theme = useTheme();
    let style: Partial<CSSProperties> = {};
    if (props.editor.id === props.highlightedEditorId) {
        style = {
            border: "1px solid " + theme.palette.error.dark,
        };
    }
    return (
        <div
            onClick={() => props.setHighlightedEditorId(props.editor.id)}
            className={"rectangle"}
            style={{
                ...style,
                left: props.editor.position.x + props.leftOffset,
                top: props.editor.position.y,
                height: props.editor.dimension.height,
                width: props.editor.dimension.width,
            }}
        >
            <Monaco
                defaultLanguage={props.editor.language}
                defaultValue={props.editor.value}
                width={props.editor.dimension.width - 10}
                options={{
                    minimap: {
                        enabled: false
                    }
                }}
            />
        </div>
    );
}
