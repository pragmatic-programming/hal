import React from "react";
import { Editor } from "../../model/Editor";
import { EditorRenderer } from "./EditorRenderer";
import { useStore } from "../../Store";
import { State } from "../../State";
import { DndContext, DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import { Position } from "../../model/Position";

export default function HtmlRenderer(): React.JSX.Element {
    const editors: Editor[] = useStore((state: State) => state.canvas.editors());
    const moveEditor = useStore((state: State) => state.moveEditor);
    const moveEdges = useStore((state: State) => state.moveEdges);
    let elements: React.JSX.Element | React.JSX.Element[] = editors.map((editor: Editor) => <EditorRenderer
        editor={editor}
        key={editor.id}
    />);
    return (
        <div className={"canvas"}>
            <DndContext
                onDragEnd={(event: DragEndEvent): void => {
                    moveEditor(
                        Number(event.active.id),
                        Position.create(event.delta)
                    );
                }}
                onDragMove={(event: DragMoveEvent): void => {
                    moveEdges(
                        Number(event.active.id),
                        Position.create(event.delta)
                    );
                }}
            >
                {elements}
            </DndContext>
        </div>
    );
}
