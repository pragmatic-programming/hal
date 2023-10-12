import { Editor } from "./Editor";
import { Position } from "./Position";
import { Dimension } from "./Dimension";

export class Editors {
    constructor(
        readonly editors: Map<number, Editor>,
    ) {
    }

    editor(id: number): Editor {
        let editor: Editor | undefined = this.editors.get(id);
        if (editor === undefined) {
            throw Error("Editor with id " + id + " does not exist");
        }
        return editor;
    }

    addedEditor(): Editors {
        const nextId = this.nextId();
        return new Editors(
            this.copiedEditorMap()
                .set(
                    nextId,
                    new Editor(
                        nextId,
                        new Dimension(640, 480),
                        new Position(0, 0),
                        "javascript",
                        "alert('Hello '+ x)"
                    )
                )
        );

    }

    movedEditor(id: number, delta: Position): Editors {
        return new Editors(
            this.copiedEditorMap()
                .set(
                    id,
                    this.editor(id).moved(delta)
                )
        );
    }

    removedEditor(id: number): Editors {
        const editors = this.copiedEditorMap();
        editors.delete(id);
        return new Editors(editors);
    }

    private copiedEditorMap(): Map<number, Editor> {
        return new Map(this.editors);
    }


    private nextId(): number {
        return Math.max(...Array.from(this.editors.keys()), 0) + 1;
    }
}
