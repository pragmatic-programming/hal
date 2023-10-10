import { Editor } from "./Editor";

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
}
