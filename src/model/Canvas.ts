import { Editor } from "./Editor";
import { Position } from "./Position";
import { Dimension } from "./Dimension";

export class Canvas {
    constructor(
        readonly editors: Editor[]
    ) {
    }

    addEditor(): Canvas {
        return new Canvas(
            [
                ...this.editors,
                new Editor(
                    this.nextId(),
                    new Dimension(640, 480),
                    new Position(0, 0),
                    "javascript",
                    "alert('Hello '+ x)"
                )
            ]
        );
    }

    removeEditor(editorId: number | null): Canvas {
        return new Canvas(
            this.editors
                .filter(editor => editor.id !== editorId)
        );
    }

    moveEditor(editorId: number, delta: Position): Canvas {
        return new Canvas(
            this.editors.map((editor: Editor): Editor => {
                if (editor.id === editorId) {
                    return editor.moved(delta);
                }
                return editor;
            })
        );
    }

    nextId(): number {
        return Math.max(...this.editors.map(editor => editor.id), 0) + 1;
    }
}
