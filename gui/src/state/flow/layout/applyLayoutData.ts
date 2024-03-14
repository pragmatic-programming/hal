import { ElkNode, LayoutOptions } from "elkjs/lib/elk-api";
import { Node } from "reactflow";
import { strictNode, StrictNode } from "../../../model/node/StrictNode";
import { NodeData, NodeDataHierarchy } from "../../../model/node/NodeData";
import { sourcePosition, targetPosition } from "../LayoutDirectionIndicator";

export function applyLayoutData(
    elkNode: ElkNode,
    nodeMap: Map<string, Node>,
    layoutOptions: LayoutOptions
): Node[] {
    const nodes: Node[] = [];

    if (!elkNode.children) {
        return nodes;
    }

    for (const child of elkNode.children) {
        const node: StrictNode<NodeData> = strictNode(nodeMap.get(child.id));
        if (!child.x) {
            throw new Error("Child.x is undefined");
        }
        if (!child.y) {
            throw new Error("Child.y is undefined");
        }
        node.sourcePosition = sourcePosition(layoutOptions);
        node.targetPosition = targetPosition(layoutOptions);
        node.position = {
            x: child.x,
            y: child.y,
        };
        nodes.push(node);

        if (child.children) {
            (node.data as NodeDataHierarchy).width = child.width ? child.width : 800;
            (node.data as NodeDataHierarchy).height = child.height ? child.height : 800;
            const subNodes = applyLayoutData(child, nodeMap, layoutOptions);
            nodes.push(...subNodes);
        }
    }

    return nodes;
}