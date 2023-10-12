import React from "react";
import { Editor } from "../../model/Editor";
import { EditorRenderer } from "./EditorRenderer";
import { useStore } from "../../Store";
import { State } from "../../State";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Position } from "../../model/Position";

export default function HtmlRenderer(): React.JSX.Element {
    const editors: Editor[] = useStore((state: State) => Array.from(state.canvas.editors.values()));
    const moveEditor = useStore((state: State) => state.moveEditor);
    return (
        <div className={"canvas"}>
            <DndContext
                onDragEnd={(event: DragEndEvent) => {
                    moveEditor(
                        Number(event.active.id),
                        new Position(event.delta.x, event.delta.y)
                    );
                }}
            >
                {editors.map((editor: Editor) => <EditorRenderer
                    editor={editor}
                    key={editor.id}
                />)}
            </DndContext>
        </div>
    );
}
