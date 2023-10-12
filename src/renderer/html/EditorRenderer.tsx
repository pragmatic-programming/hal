import React, { CSSProperties } from "react";
import { Editor } from "../../model/Editor";
import { Editor as Monaco } from "@monaco-editor/react";
import { Theme, useTheme } from "@mui/material";
import { useStore } from "../../Store";
import { State } from "../../State";
import { useDraggable } from "@dnd-kit/core";
import { EditorHeader } from "./EditorHeader";

interface Props {
    editor: Editor;
}

//todo this components requires refactoring
export function EditorRenderer(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    const menuWidth: number = useStore((state: State) => state.menuWidth);
    const firstSelectedEditor: number | null = useStore((state: State) => state.highlightedEditor.first);
    const secondSelectedEditor: number | null = useStore((state: State) => state.highlightedEditor.second);
    const selectEditor = useStore((state: State) => state.selectEditor);
    const updateEditorValue = useStore((state: State) => state.updateEditorValue);
    const {listeners, setNodeRef, transform} = useDraggable({id: props.editor.id,});
    let style: Partial<CSSProperties> = {
        borderColor: theme.palette.info.light,
        borderStyle: "solid",
        borderWidth: 1,
        background: theme.palette.gui.menu.background
    };
    if (transform) {
        style = {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        };
    }
    if (props.editor.id === firstSelectedEditor || props.editor.id === secondSelectedEditor) {
        style = {
            ...style,
            borderWidth: 2
        };
    }
    return (
        <div
            ref={setNodeRef}
            className={"rectangle"}
            style={{
                ...style,
                left: props.editor.position.x + menuWidth,
                top: props.editor.position.y,
                height: props.editor.dimension.height,
                width: props.editor.dimension.width,
            }}
            {...listeners}
            onDoubleClick={() => selectEditor(props.editor.id)}
        >
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
        </div>
    );
}
