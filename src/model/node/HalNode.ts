import { Node } from "reactflow";
import { NodeTypeIndicator } from "./NodeTypeIndicator";
import { NodeData } from "./NodeData";
import { NodeDataFactory } from "./NodeDataFactory";

export class HalNode {
    private readonly node: Node;

    constructor(node: Node) {
        this.node = node;
    }

    public transformByNodeTypeIndicator(type: NodeTypeIndicator): Node {
        const node = {
            ...this.node
        };
        const data: NodeData = NodeDataFactory.fromCreationNode(type);
        node.type = type;
        node.data = data;
        node.height = data.height;
        node.width = data.width;
        return node;
    }
}
