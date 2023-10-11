import { Editor } from "../src/model/Editor";
import { Dimension } from "../src/model/Dimension";
import { Position } from "../src/model/Position";
import { Edge } from "../src/model/Edge";

describe("create()", () => {
    it("from and to touch", () => {
        const from = new Editor(
            1,
            new Dimension(100, 100),
            new Position(0, 0),
            "",
            "",
        );
        const to = new Editor(
            2,
            new Dimension(100, 100),
            new Position(100, 0),
            "",
            "",
        );
        const edge = Edge.create(from, to);
        //then
        expect(edge.from).toBe(1);
        expect(edge.to).toBe(2);
        expect(edge.start.x).toBe(100);
        expect(edge.start.y).toBe(50);
        expect(edge.end.x).toBe(100);
        expect(edge.end.y).toBe(50);
    });

    it("from is right of to", () => {
        const to = new Editor(
            1,
            new Dimension(10, 15),
            new Position(0, 5),
            "",
            "",
        );
        const from = new Editor(
            2,
            new Dimension(20, 30),
            new Position(5, 10),
            "",
            "",
        );
        const edge = Edge.create(from, to);
        //then
        expect(edge.from).toBe(2);
        expect(edge.to).toBe(1);
        expect(edge.start.x).toBe(5);
        expect(edge.start.y).toBe(25);
        expect(edge.end.x).toBe(10);
        expect(edge.end.y).toBe(13);
    });
});
