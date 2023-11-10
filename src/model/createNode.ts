import { SourceNode } from "ihgraph";
import { Node } from "reactflow";
import { Language } from "./Languages";
import { FlowToIHGraphProcessor } from "./processor/FlowToIHGraphProcessor";
import { NodeData, NodeDataCreation, NodeDataEditor, NodeDataImage, NodeDataResult } from "./NodeData";
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
        height: 0
    };
    if (sourceNode.hasAnnotation(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA)) {
        nodeData = sourceNode.getAnnotationData<NodeData>(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA);
    }
    switch (nodeData.type) {
        case "creation":
            return createNodeCreation(
                sourceNode.getId(),
                0,
                0,
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
): Node<NodeDataCreation> {

    return {
        id: id,
        type: "creation",
        data: createNodeDataCreation(),
        position: {x: x, y: y},
        width: 0,
        height: 0,
    };
}

function creatNodeEditor(
    id: string,
    content: string,
    label: string,
    language: Language,
    x: number,
    y: number,
    width: number,
    height: number,
): Node<NodeDataEditor> {
    return {
        id: id,
        type: "editor",
        data: createNodeDataEditor(content, label, language, height, width),
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
