import { Editor } from "./Editor";

export class Canvas {
    constructor(
        readonly editors: Editor[]
    ) {
    }

    addEditor(editor: Editor):Canvas {
        return new Canvas(
            [
                ...this.editors,
                editor
            ]
        );
    }
}
