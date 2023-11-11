import { SourceNode, SourceNodeStatus } from "ihgraph";
import { Node, Position } from "reactflow";
import { LanguageIndicator } from "./LanguageIndicator";
import { FlowToIHGraphProcessor } from "../processor/FlowToIHGraphProcessor";
import { NodeData, NodeDataCreate, NodeDataEditor, NodeDataImage, } from "./NodeData";
import { createNodeDataCreation, createNodeDataEditor, createNodeDataImage } from "./createNodeData";


export function createNodeFromSourceNode(sourceNode: SourceNode): Node<NodeData> {
    const nodeData: NodeData = sourceNode.getAnnotationData<NodeData>(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA);
    switch (nodeData.type) {
        case "create":
            return createNodeCreate(
                sourceNode.getId(),
                0,
                0,
                Position.Left
            );
        case "editor":
            return creatNodeEditor(
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
            return createNodeImage(
                sourceNode.getId(),
                sourceNode.getContent(),
                0,
                0,
                nodeData.width,
                nodeData.height,
            );
    }
}


export function createNodeCreate(
    id: string,
    x: number,
    y: number,
    targetPosition: Position
): Node<NodeDataCreate> {
    return {
        id: id,
        type: "create",
        data: createNodeDataCreation(),
        position: {x: x, y: y},
        targetPosition: targetPosition,
        width: 0,
        height: 0,
    };
}

function creatNodeEditor(
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
        data: createNodeDataEditor(content, label, language, height, width, status),
        position: {x: x, y: y},
        width: width,
        height: height,
    };
}


export function createNodeImage(
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
        data: createNodeDataImage(content, height, width),
        position: {x: x, y: y},
        width: width,
        height: height,
    };
}
