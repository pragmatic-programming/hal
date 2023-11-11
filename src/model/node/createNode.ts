import { SourceNode, SourceNodeStatus } from "ihgraph";
import { Node, Position } from "reactflow";
import { LanguageIndicator } from "./LanguageIndicator";
import { FlowToIHGraphProcessor } from "../processor/FlowToIHGraphProcessor";
import { NodeData, NodeDataCreate, NodeDataEditor, NodeDataImage, NodeDataResult } from "./NodeData";
import {
    createNodeDataCreation,
    createNodeDataEditor,
    createNodeDataImage,
    createNodeDataResult
} from "./createNodeData";


export function createNodeFromSourceNode(sourceNode: SourceNode): Node<NodeData> {
    //todo
    let nodeData: NodeData = {
        label: "unknown",
        language: "JavaScript",
        type: "editor",
        content: "",
        width: 0,
        height: 0,
        status: SourceNodeStatus.UNDEFINED,
    };
    if (sourceNode.hasAnnotation(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA)) {
        nodeData = sourceNode.getAnnotationData<NodeData>(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA);
    }
    switch (nodeData.type) {
        case "create":
            return createNodeCreation(
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
        case "result":
            return createNodeResult(
                sourceNode.getId(),
                0,
                0,
                nodeData.width,
                nodeData.height,
            );
    }
}


export function createNodeCreation(
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


export function createNodeResult(
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    //todo introduce specific node type => NodeImage
): Node<NodeDataResult> {
    return {
        id: id,
        type: "result",
        data: createNodeDataResult(height, width),
        position: {x: x, y: y},
        width: width,
        height: height,
    };
}