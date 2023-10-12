import { Editor } from "./Editor";
import { Position } from "./Position";
import { Dimension } from "./Dimension";
import { Edge } from "./Edge";

export class Canvas {
    constructor(
        readonly editors: Map<number, Editor>,
        readonly edges: Edge[]
    ) {
    }

    addEditor(): Canvas {
        const nextId = this.nextId();
        return new Canvas(
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
                ),
            this.edges
        );
    }

    removeEditor(editorId: number): Canvas {
        const map = this.copiedEditorMap();
        map.delete(editorId);
        return new Canvas(
            map,
            this.removeEdges(editorId)
        );
    }

    moveEditor(editorId: number, delta: Position): Canvas {
        const map = this.copiedEditorMap();
        const movedEditor = this.editor(map, editorId).moved(delta);
        map.set(editorId, movedEditor);
        return new Canvas(
            map,
            this.moveEdges(editorId, movedEditor, map)
        );
    }

    private copiedEditorMap(): Map<number, Editor> {
        return new Map(this.editors);
    }

    private moveEdges(editorId: number, movedEditor: Editor, map: Map<number, Editor>): Edge[] {
        return this.edges.map((edge: Edge): Edge => {
            if (edge.from === editorId) {
                return Edge.create(movedEditor, this.editor(map, edge.to));
            }
            if (edge.to === editorId) {
                return Edge.create(this.editor(map, edge.from), movedEditor);
            }
            return edge;
        });
    }

    private editor(map: Map<number, Editor>, id: number): Editor {
        let editor: Editor | undefined = map.get(id);
        if (editor === undefined) {
            throw Error("Editor with id " + id + " does not exist");
        }
        return editor;
    }

    private removeEdges(editorId: number): Edge[] {
        return this.edges.filter((edge: Edge) => edge.from !== editorId && edge.to !== editorId);
    }

    private nextId(): number {
        return Math.max(...Array.from(this.editors.keys()), 0) + 1;
    }
}
