import { Dimensions, Node } from "reactflow";
import { NodeTypeIndicator } from "./NodeTypeIndicator";
import { NodeData } from "./NodeData";
import { NodeDataFactory } from "./NodeDataFactory";
import { DimensionsForContent } from "../../processor/edgeTypes/DimensionsForContent";

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
        const dimensionsForContent: DimensionsForContent = new DimensionsForContent(this.node.data.content);
        const dimensions: Dimensions = dimensionsForContent.dimension();
        node.type = type;
        node.data = data;
        node.height = dimensions.height;
        node.width = dimensions.width;
        return node;
    }
}
