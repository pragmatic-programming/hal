import { IHGraph, SimpleNode, SimpleNodeStatus } from "@pragmatic-programming/ihgraph";
import { Dimensions, Node, Position, XYPosition } from "reactflow";
import { LanguageIndicator } from "./LanguageIndicator";
import { FlowToIHGraphProcessor } from "../../processors/FlowToIHGraphProcessor";
import { NodeData, NodeDataCreate, NodeDataEditor, NodeDataFile, NodeDataHierarchy, NodeDataImage } from "./NodeData";
import { NodeDataFactory } from "./NodeDataFactory";
import { DimensionsForContent } from "../../processors/edgeTypes/DimensionsForContent";
import { NodeTypeIndicator } from "./NodeTypeIndicator";
import { originOfCoordinates } from "../../util";

export class NodeFactory {

    static fromCreationNode(node: Node<NodeDataCreate>, newNodeTypeIdentifier: NodeTypeIndicator): Node<NodeData> {
        switch (newNodeTypeIdentifier) {
            case "create":
                throw new Error("Node is already a creation node");
            case "editor":
                return NodeFactory.nodeEditorWithoutDimension(
                    node.id,
                    "",
                    "Editor",
                    "JavaScript",
                    node.position,
                    SimpleNodeStatus.UNDEFINED,
                );
            case "image":
                return NodeFactory.nodeImage(
                    node.id,
                    "",
                    node.position,
                    0,
                    0,
                );
            case "file":
                return NodeFactory.nodeFile(
                    node.id,
                    undefined,
                    undefined,
                    node.position,
                    100,
                    100
                );
            case "hierarchy":
                throw new Error("Creation nodes cannot be of type hierarchy!");
        }
    }

    static fromSourceNode(simpleNode: SimpleNode): Node<NodeData> {
        if (!simpleNode.hasAnnotation(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA)) {
            return NodeFactory.nodeEditorWithoutDimensionsAndPosition(
                simpleNode.getId(),
                simpleNode.getContent(),
                simpleNode.getId(),
                "PlainText",
                simpleNode.getStatus(),
            );
        }

        const nodeData: NodeData = simpleNode.getAnnotationData<NodeData>(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA);
        switch (nodeData.type) {
            case "create":
                return NodeFactory.nodeCreate(
                    simpleNode.getId(),
                    nodeData.position,
                    Position.Left
                );
            case "editor":
                return NodeFactory.nodeEditor(
                    simpleNode.getId(),
                    simpleNode.getContent(),
                    nodeData.label,
                    nodeData.language,
                    nodeData.position,
                    nodeData.width,
                    nodeData.height,
                    simpleNode.getStatus(),
                );
            case "image":
                return NodeFactory.nodeImage(
                    simpleNode.getId(),
                    simpleNode.getContent(),
                    nodeData.position,
                    nodeData.width,
                    nodeData.height,
                );
            case "file":
                return NodeFactory.nodeFile(
                    simpleNode.getId(),
                    simpleNode.getContent(),
                    undefined,
                    nodeData.position,
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
            {
                x: 200,
                y: 100
            },
        );
    }


    static nodeImage(
        id: string,
        content: string | undefined,
        position: XYPosition | undefined,
        width: number,
        height: number,
    ): Node<NodeDataImage> {
        return {
            id: id,
            type: "image",
            data: NodeDataFactory.nodeDataImage(
                content,
                position,
                width,
                height,
                SimpleNodeStatus.UNDEFINED
            ),
            position: NodeFactory.nodePosition(position),
            width: width,
            height: height,
        };
    }


    static nodeCreate(
        id: string,
        position: XYPosition | undefined,
        targetPosition: Position
    ): Node<NodeDataCreate> {
        return {
            id: id,
            type: "create",
            data: NodeDataFactory.nodeDataCreate(position),
            position: NodeFactory.nodePosition(position),
            targetPosition: targetPosition,
            width: 0,
            height: 0,
        };
    }

    static nodeEditorWithoutDimension(
        id: string,
        content: string | undefined,
        label: string,
        language: LanguageIndicator,
        position: XYPosition | undefined,
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
                position,
                dimensions.width,
                dimensions.height
            ),
            position: NodeFactory.nodePosition(position),
        };
    }


    static nodeEditor(
        id: string,
        content: string | undefined,
        label: string,
        language: LanguageIndicator,
        position: XYPosition | undefined,
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
                position,
                width,
                height,
            ),
            position: NodeFactory.nodePosition(position),
            width: width,
            height: height,
        };
    }

    static nodeEditorWithoutDimensionsAndPosition(
        id: string,
        content: string | undefined,
        label: string,
        language: LanguageIndicator,
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
                undefined,
                dimensions.width,
                dimensions.height,
            ),
            position: NodeFactory.nodePosition(undefined),
        };
    }

    static nodeFile(
        id: string,
        content: string | undefined,
        fileType: "text/plain" | undefined,
        position: XYPosition | undefined,
        width: number,
        height: number,
    ): Node<NodeDataFile> {
        return {
            id: id,
            type: "file",
            data: NodeDataFactory.nodeDataFile(
                content,
                fileType,
                position,
                height,
                width,
            ),
            position: NodeFactory.nodePosition(position),
            width: width,
            height: height,
        };
    }


    static nodeHierarchy(
        id: string,
        position: XYPosition | undefined,
    ): Node<NodeDataHierarchy> {
        const width: number = 400;
        const height: number = 200;
        return {
            id: id,
            type: "hierarchy",
            data: NodeDataFactory.nodeDataHierarchy(position, height, width),
            position: NodeFactory.nodePosition(position),
            width: width,
            height: height,
            // lower zIndex so that edges "inside" of hierarchy nodes are visible
            zIndex: -1,
        };
    }

    private static nodePosition(position: XYPosition | undefined): XYPosition {
        if (position === undefined) {
            return originOfCoordinates();
        }
        return position;
    }
}






