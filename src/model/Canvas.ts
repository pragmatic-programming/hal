import { Editor } from "./Editor";
import { Position } from "./Position";
import { Dimension } from "./Dimension";
import { Edge } from "./Edge";

export class Canvas {
    constructor(
        readonly editors: Editor[],
        readonly edges: Edge[]
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
            ],
            this.edges
        );
    }

    removeEditor(editorId: number | null): Canvas {
        return new Canvas(
            this.editors.filter(editor => editor.id !== editorId),
            this.edges.filter((edge: Edge) => edge.from !== editorId && edge.to !== editorId)
        );
    }

    moveEditor(editorId: number, delta: Position): Canvas {
        return new Canvas(
            this.editors.map((editor: Editor): Editor => {
                    if (editor.id === editorId) {
                        return editor.moved(delta);
                    }
                    return editor;
                }
            ),
            this.edges.map((edge:Edge): Edge=>{
               if(edge.from === editorId){
                    return edge.startMoved(delta)
               }
               if(edge.to === editorId){
                   return edge.endMoved(delta)
               }
               return edge
            })
        );
    }

    nextId(): number {
        return Math.max(...this.editors.map(editor => editor.id), 0) + 1;
    }
}
