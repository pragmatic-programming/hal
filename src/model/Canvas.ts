import { Position } from "./Position";
import { Edges } from "./Edges";
import { Editors } from "./Editors";
import { Editor } from "./Editor";
import { Edge } from "./Edge";

export class Canvas {
    constructor(
        readonly _editors: Editors,
        readonly _edges: Edges
    ) {
    }

    editors(): Editor[] {
        return Array.from(this._editors.editors.values());
    }

    edges(): Edge[] {
        return this._edges.edges;
    }

    addedEditor(): Canvas {
        return new Canvas(
            this._editors.addedEditor(),
            this._edges
        );
    }

    removedEditor(id: number): Canvas {
        return new Canvas(
            this._editors.removedEditor(id),
            this._edges.removedEdges(id)
        );
    }

    movedEditor(id: number, delta: Position): Canvas {
        const editors = this._editors.movedEditor(id, delta);
        return new Canvas(
            editors,
            this._edges.movedEdges(editors.editor(id), editors)
        );
    }

    movedEdges(editorId: number, delta: Position): Canvas {
        return new Canvas(
            this._editors,
            this._edges.movedEdges(
                //this editor is just used as a helper for moving edges, it won't persist
                this._editors.editor(editorId).moved(delta),
                this._editors
            )
        );
    }

    addedEdge(first: number, second: number): Canvas {
        return new Canvas(
            this._editors,
            this._edges.addedEdge(this._editors.editor(first), this._editors.editor(second))
        );
    }

    updateEditorValue(id: number, value: string | undefined) {
        return new Canvas(
            this._editors.replaceEditor(
                this._editors
                    .editor(id)
                    .updatedValue(value)
            ),
            this._edges
        );
    }
}
