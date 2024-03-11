import { IHGraph, SimpleNode, SimpleNodeStatus } from "@pragmatic-programming/ihgraph";
import { Node, Position } from "reactflow";
import { LanguageIndicator } from "./LanguageIndicator";
import { FlowToIHGraphProcessor } from "../../processors/FlowToIHGraphProcessor";
import { NodeData, NodeDataCreate, NodeDataEditor, NodeDataFile, NodeDataHierarchy, NodeDataImage } from "./NodeData";
import { NodeDataFactory } from "./NodeDataFactory";
import { DimensionsForContent } from "../../processors/edgeTypes/DimensionsForContent";
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
            case "hierarchy":
                throw new Error("Creation nodes cannot be of type hierarchy!");
        }
    }

    static fromSourceNode(simpleNode: SimpleNode): Node<NodeData> {
        if (!simpleNode.hasAnnotation(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA)) {
            return NodeFactory.nodeEditor(
                simpleNode.getId(),
                simpleNode.getContent(),
                simpleNode.getId(),
                "PlainText",
                0,
                0,
                simpleNode.getStatus(),
            );
        }

        const nodeData: NodeData = simpleNode.getAnnotationData<NodeData>(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA);
        switch (nodeData.type) {
            case "create":
                return NodeFactory.nodeCreate(
                    simpleNode.getId(),
                    0,
                    0,
                    Position.Left
                );
            case "editor":
                return NodeFactory.nodeEditor(
                    simpleNode.getId(),
                    simpleNode.getContent(),
                    nodeData.label,
                    nodeData.language,
                    0,
                    0,
                    simpleNode.getStatus(),
                );
            case "image":
                return NodeFactory.nodeImage(
                    simpleNode.getId(),
                    simpleNode.getContent(),
                    0,
                    0,
                    nodeData.width,
                    nodeData.height,
                );
            case "file":
                return NodeFactory.nodeFile(
                    simpleNode.getId(),
                    simpleNode.getContent(),
                    // todo
                    undefined,
                    0,
                    0,
                    nodeData.width,
                    nodeData.height,
                );
            case "hierarchy":
                throw new Error("Simple nodes cannot be of type hierarchy!");
        }
    }

    static fromGraphNode(graphNode: IHGraph): Node<NodeData> {
        return NodeFactory.nodeHierarchy(
            graphNode.getId(),
            200,
            100,
        );
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

    static nodeFile(
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

    static nodeHierarchy(
        id: string,
        x: number,
        y: number,
    ): Node<NodeDataHierarchy> {
        const width: number = 400;
        const height: number = 200;
        return {
            id: id,
            type: "hierarchy",
            data: NodeDataFactory.nodeDataHierarchy(height, width),
            position: {x: x, y: y},
            width: width,
            height: height,
            // lower zIndex so that edges "inside" of hierarchy nodes are visible
            zIndex: -1,
        };
    }
}






