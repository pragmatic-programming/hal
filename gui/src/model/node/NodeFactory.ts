import { SimpleNode, SimpleNodeStatus } from "@pragmatic-programming/ihgraph";
import { Dimensions, Node, Position } from "reactflow";
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
                    100,
                    100
                );
        }
    }

    static fromSourceNode(simpleNode: SimpleNode): Node<NodeData> {
        if (!simpleNode.hasAnnotation(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA)) {
            return NodeFactory.nodeEditor(
                simpleNode.getId(),
                simpleNode.getContent(),
                simpleNode.getId(),
                "PlainText",
                1,
                1,
                simpleNode.getStatus(),
            );
        }

        const nodeData: NodeData = simpleNode.getAnnotationData<NodeData>(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA);
        switch (nodeData.type) {
            case "create":
                return NodeFactory.nodeCreate(
                    simpleNode.getId(),
                    nodeData.x,
                    nodeData.y,
                    Position.Left
                );
            case "editor":
                return NodeFactory.nodeEditorWithDimensions(
                    simpleNode.getId(),
                    simpleNode.getContent(),
                    nodeData.label,
                    nodeData.language,
                    nodeData.x,
                    nodeData.y,
                    nodeData.width,
                    nodeData.height,
                    simpleNode.getStatus(),
                );
            case "image":
                return NodeFactory.nodeImage(
                    simpleNode.getId(),
                    simpleNode.getContent(),
                    nodeData.x,
                    nodeData.y,
                    nodeData.width,
                    nodeData.height,
                );
            case "file":
                return NodeFactory.nodeFile(
                    simpleNode.getId(),
                    simpleNode.getContent(),
                    // todo
                    undefined,
                    nodeData.x,
                    nodeData.y,
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
            data: NodeDataFactory.nodeDataImage(
                content,
                x,
                y,
                width,
                height,
                SimpleNodeStatus.UNDEFINED
            ),
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
            data: NodeDataFactory.nodeDataCreate(x, y),
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
        const dimensions: Dimensions = dimensionsForContent.dimension();
        return {
            ...dimensions,
            id: id,
            type: "editor",
            data: NodeDataFactory.nodeDataEditor(
                content,
                label,
                language,
                status,
                x,
                y,
                dimensions.width,
                dimensions.height
            ),
            position: {x: x, y: y},
        };
    }

    static nodeEditorWithDimensions(
        id: string,
        content: string | undefined,
        label: string,
        language: LanguageIndicator,
        x: number,
        y: number,
        width: number,
        height: number,
        status: SimpleNodeStatus,
    ): Node<NodeDataEditor> {
        return {
            id: id,
            type: "editor",
            data: NodeDataFactory.nodeDataEditor(
                content,
                label,
                language,
                status,
                x,
                y,
                width,
                height,
            ),
            position: {x: x, y: y},
            width: width,
            height: height,
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
                x,
                y,
                height,
                width,
            ),
            position: {x: x, y: y},
            width: width,
            height: height,
        };
    }
}






