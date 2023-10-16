import { Editor } from "./Editor";
import { Dimension } from "./Dimension";
import { Position } from "./Position";
import { Project } from "./Project";
import { Editors } from "./Editors";
import { Edges } from "./Edges";
import { Edge } from "./Edge";

const map = new Map<number, Editor>();

let editor1 = new Editor(
    1,
    new Dimension(640, 480),
    new Position(50, 50),
    "javascript",
    "var x = 'World';",
);
let editor2 = new Editor(
    2,
    new Dimension(640, 480),
    new Position(800, 50),
    "javascript",
    "alert('Hello '+ x)"
);

map.set(editor1.id, editor1);
map.set(editor2.id, editor2);
export const example = new Project(
        "hello-world.hal",
        new Editors(map),
        new Edges([
            Edge.create(editor1, editor2)
        ])
    )
;
