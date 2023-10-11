import React, { CSSProperties } from "react";
import { Editor } from "../../model/Editor";
import { Editor as Monaco } from "@monaco-editor/react";
import { useTheme } from "@mui/material";
import { useStore } from "../../Store";
import { State } from "../../State";

interface Props {
    editor: Editor;
}

export function EditorRenderer(props: Props): React.JSX.Element {
    const theme = useTheme();
    const highlightedEditorId: number | null = useStore((state: State) => state.highlightedEditorId);
    const selectEditor = useStore((state: State) => state.selectEditor);
    const menuWidth: number = useStore((state: State) => state.menuWidth);
    let style: Partial<CSSProperties> = {};
    if (props.editor.id === highlightedEditorId) {
        style = {
            border: "1px solid " + theme.palette.error.dark,
        };
    }
    return (
        <div
            onClick={() => selectEditor(props.editor.id === highlightedEditorId ? null : props.editor.id)}
            className={"rectangle"}
            style={{
                ...style,
                left: props.editor.position.x + menuWidth,
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
