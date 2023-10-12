import React, { CSSProperties } from "react";
import { Theme, useTheme } from "@mui/material";
import { useStore } from "../../Store";
import { State } from "../../State";
import { useDraggable } from "@dnd-kit/core";
import { Editor } from "../../model/Editor";

interface Props {
    editor: Editor;
    children: React.JSX.Element[];
}

export function Draggable(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    const menuWidth: number = useStore((state: State) => state.menuWidth);
    const firstSelectedEditor: number | null = useStore((state: State) => state.highlightedEditor.first);
    const secondSelectedEditor: number | null = useStore((state: State) => state.highlightedEditor.second);
    const selectEditor = useStore((state: State) => state.selectEditor);
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
            {props.children}
        </div>
    );
}
