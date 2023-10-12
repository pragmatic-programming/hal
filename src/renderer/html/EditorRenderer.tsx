import React from "react";
import { Editor } from "../../model/Editor";
import { Editor as Monaco } from "@monaco-editor/react";
import { useStore } from "../../Store";
import { State } from "../../State";
import { EditorHeader } from "./EditorHeader";
import { Draggable } from "./Draggable";

interface Props {
    editor: Editor;
}

export function EditorRenderer(props: Props): React.JSX.Element {
    const updateEditorValue = useStore((state: State) => state.updateEditorValue);
    return (
        <Draggable editor={props.editor}>
            <EditorHeader/>
            <Monaco
                defaultLanguage={props.editor.language}
                defaultValue={props.editor.value}
                width={props.editor.dimension.width}
                height={props.editor.dimension.height - 20 - 5 - 5}
                options={{
                    minimap: {
                        enabled: false
                    }
                }}
                onChange={(value) => updateEditorValue(props.editor.id, value)}
            />
        </Draggable>
    );
}
