import { SimpleNode, SimpleNodeStatus } from "ihgraph";
import { Node, Position } from "reactflow";
import { LanguageIndicator } from "./LanguageIndicator";
import { FlowToIHGraphProcessor } from "../../processor/FlowToIHGraphProcessor";
import { NodeData, NodeDataCreate, NodeDataEditor, NodeDataFile, NodeDataImage, } from "./NodeData";
import { NodeDataFactory } from "./NodeDataFactory";
import { DimensionsForContent } from "../../processor/edgeTypes/DimensionsForContent";
import { NodeTypeIndicator } from "./NodeTypeIndicator";

export class NodeFactory {

    static fromCreationNode(node: Node<NodeDataCreate>, newNodeTypeIdentifier: NodeTypeIndicator): Node<NodeData> {
        switch (newNodeTypeIdentifier) {
            case "create":
                throw new Error("Node is already a creation node");
            case "editor":
                return NodeFactory.nodeEditor(
                    node.id,
                    "",
                    "Editor",
                    "JavaScript",
                    node.position.x,
                    node.position.y,
                    SimpleNodeStatus.UNDEFINED,
                );
            case "image":
                return NodeFactory.nodeImage(
                    node.id,
                    "",
                    node.position.x,
                    node.position.y,
                    0,
                    0,
                );
            case "file":
                return NodeFactory.nodeFile(
                    node.id,
                    undefined,
                    undefined,
                    node.position.x,
                    node.position.y,
                    // todo remove
                    100,
                    100
                );
        }
    }

    static fromSourceNode(sourceNode: SimpleNode): Node<NodeData> {
        const nodeData: NodeData = sourceNode.getAnnotationData<NodeData>(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA);
        switch (nodeData.type) {
            case "create":
                return NodeFactory.nodeCreate(
                    sourceNode.getId(),
                    0,
                    0,
                    Position.Left
                );
            case "editor":
                return NodeFactory.nodeEditor(
                    sourceNode.getId(),
                    sourceNode.getContent(),
                    nodeData.label,
                    nodeData.language,
                    0,
                    0,
                    sourceNode.getStatus(),
                );
            case "image":
                return NodeFactory.nodeImage(
                    sourceNode.getId(),
                    sourceNode.getContent(),
                    0,
                    0,
                    nodeData.width,
                    nodeData.height,
                );
            case "file":
                return NodeFactory.nodeFile(
                    sourceNode.getId(),
                    sourceNode.getContent(),
                    // todo
                    undefined,
                    0,
                    0,
                    nodeData.width,
                    nodeData.height,
                );
        }
    }


    static nodeImage(
        id: string,
        content: string | undefined,
        x: number,
        y: number,
        width: number,
        height: number,
    ): Node<NodeDataImage> {
        return {
            id: id,
            type: "image",
            data: NodeDataFactory.nodeDataImage(content, height, width, SimpleNodeStatus.UNDEFINED),
            position: {x: x, y: y},
            width: width,
            height: height,
        };
    }


    static nodeCreate(
        id: string,
        x: number,
        y: number,
        targetPosition: Position
    ): Node<NodeDataCreate> {
        return {
            id: id,
            type: "create",
            data: NodeDataFactory.nodeDataCreate(),
            position: {x: x, y: y},
            targetPosition: targetPosition,
            width: 0,
            height: 0,
        };
    }

    static nodeEditor(
        id: string,
        content: string | undefined,
        label: string,
        language: LanguageIndicator,
        x: number,
        y: number,
        status: SimpleNodeStatus,
    ): Node<NodeDataEditor> {
        // if content is undefined, we use an empty string to calculate dimensions
        let dimensionsForContent: DimensionsForContent = new DimensionsForContent("");
        if (content !== undefined) {
            dimensionsForContent = new DimensionsForContent(content);
        }
        return {
            ...dimensionsForContent.dimension(),
            id: id,
            type: "editor",
            data: NodeDataFactory.nodeDataEditor(content, label, language, status),
            position: {x: x, y: y},
        };
    }

    private static nodeFile(
        id: string,
        content: string | undefined,
        fileType: "text/plain" | undefined,
        x: number,
        y: number,
        width: number,
        height: number,
    ): Node<NodeDataFile> {
        return {
            id: id,
            type: "file",
            data: NodeDataFactory.nodeDataFile(
                content,
                fileType,
                height,
                width,
            ),
            position: {x: x, y: y},
            width: width,
            height: height,
        };
    }
}






