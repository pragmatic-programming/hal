import React from "react";
import { Editor } from "../../model/Editor";
import { Editor as Monaco } from "@monaco-editor/react";

interface Props {
    editor: Editor;
    leftOffset: number;
}

export function EditorRenderer(props: Props): JSX.Element {
    return (
        <div
            className={"rectangle"}
            style={{
                height: props.editor.dimension.height,
                left: props.editor.position.x + props.leftOffset,
                top: props.editor.position.y,
                width: props.editor.dimension.width,
            }}
        >
            <Monaco
                defaultLanguage={props.editor.language}
                defaultValue={props.editor.value}
                width={"100%"}
                options={{
                    minimap: {
                        enabled: false
                    }
                }}
            />
        </div>
    );
}
