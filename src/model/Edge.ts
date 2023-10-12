import { Position } from "./Position";
import { EdgeStyle } from "./EdgeStyle";
import { Editor } from "./Editor";

export class Edge {
    readonly key: string;

    constructor(
        readonly from: number,
        readonly to: number,
        readonly start: Position,
        readonly end: Position,
        readonly style: EdgeStyle = EdgeStyle.solid
    ) {
        this.key = from.toString() + to.toString();
    }

    static create(from: Editor, to: Editor): Edge {
        let start: Position;
        let end: Position;
        let fromVerticalMiddle = this.verticalMiddle(from);
        let toVerticalMiddle = this.verticalMiddle(to);
        if (from.position.x > to.position.x) {
            start = new Position(
                from.position.x,
                fromVerticalMiddle
            );
            end = new Position(
                this.outsideEdgeRight(to),
                toVerticalMiddle
            );
        } else {
            start = new Position(
                this.outsideEdgeRight(from),
                fromVerticalMiddle
            );
            end = new Position(
                to.position.x,
                toVerticalMiddle
            );
        }
        return new Edge(
            from.id,
            to.id,
            start,
            end,
            EdgeStyle.dotted
        );
    }

    private static outsideEdgeRight(to: Editor) {
        return to.position.x + to.dimension.width;
    }

    private static verticalMiddle(editor: Editor) {
        return Math.round(editor.position.y + (editor.dimension.height / 2));
    }
}
