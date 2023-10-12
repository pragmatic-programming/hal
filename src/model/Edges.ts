import { Edge } from "./Edge";
import { Editor } from "./Editor";
import { Editors } from "./Editors";

export class Edges {
    constructor(
        readonly edges: Edge[]
    ) {

    }

    addedEdge(from: Editor, to: Editor): Edges {
        return new Edges(
            [
                ...this.edges,
                Edge.create(from, to)
            ]
        );
    }

    movedEdges(movedEditor: Editor, editors: Editors): Edges {
        return new Edges(
            this.edges.map((edge: Edge): Edge => {
                if (edge.from === movedEditor.id) {
                    return Edge.create(movedEditor, editors.editor(edge.to));
                }
                if (edge.to === movedEditor.id) {
                    return Edge.create(editors.editor(edge.from), movedEditor);
                }
                return edge;
            }));
    }

    removedEdges(editorId: number): Edges {
        return new Edges(
            this.edges.filter((edge: Edge) => edge.from !== editorId && edge.to !== editorId)
        );
    }
}
