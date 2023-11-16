import { SourceNode, SourceNodeStatus } from "ihgraph";
import { Node, Position } from "reactflow";
import { LanguageIndicator } from "./LanguageIndicator";
import { FlowToIHGraphProcessor } from "../processor/FlowToIHGraphProcessor";
import { NodeData, NodeDataCreate, NodeDataEditor, NodeDataImage, } from "./NodeData";
import { NodeDataFactory } from "./NodeDataFactory";

export class NodeFactory {

    static fromSourceNode(sourceNode: SourceNode): Node<NodeData> {
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
                    nodeData.width,
                    nodeData.height,
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
        }
    }


    static nodeImage(
        id: string,
        content: string,
        x: number,
        y: number,
        width: number,
        height: number,
    ): Node<NodeDataImage> {
        return {
            id: id,
            type: "image",
            data: NodeDataFactory.nodeDataImage(content, height, width),
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
            // todo this should be a create method
            data: {
                height: 0,
                type: "create",
                width: 0,
            },
            position: {x: x, y: y},
            targetPosition: targetPosition,
            width: 0,
            height: 0,
        };
    }

    static nodeEditor(
        id: string,
        content: string,
        label: string,
        language: LanguageIndicator,
        x: number,
        y: number,
        width: number,
        height: number,
        status: SourceNodeStatus,
    ): Node<NodeDataEditor> {
        return {
            id: id,
            type: "editor",
            data: NodeDataFactory.nodeDataEditor(content, label, language, height, width, status),
            position: {x: x, y: y},
            width: width,
            height: height,
        };
    }
}





