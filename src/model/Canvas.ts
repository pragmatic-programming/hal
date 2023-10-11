import { Editor } from "./Editor";
import { Position } from "./Position";

export class Canvas {
    constructor(
        readonly editors: Editor[]
    ) {
    }

    addEditor(editor: Editor): Canvas {
        return new Canvas(
            [
                ...this.editors,
                editor
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
}
