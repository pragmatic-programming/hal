import { HalNode } from "./HalNode";
import {  NodeFactory } from "./NodeFactory";
import { Position } from "@reactflow/core";

describe("transformByNodeTypeIndicator", () => {

    test("create node", () => {
        const halNode = new HalNode(NodeFactory.nodeCreate("id", 0, 0, Position.Right));
        expect(() => halNode.transformByNodeTypeIndicator("create"))
            .toThrowError("Node is already a creation node");
    });

    test("image node", () => {
        const node = NodeFactory.nodeImage("id", "", 0, 0, 0, 0);
        const halNode = new HalNode(node);
        expect(halNode.transformByNodeTypeIndicator("image")).toEqual(node);
    });
});
