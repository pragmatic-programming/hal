import { SourceNode } from "ihgraph";
import { Node } from "reactflow";
import NodeData from "./NodeData";
import { nodeType } from "../ui/flow/flow/NodeTypes";
import { Language } from "./Languages";
import { FlowToIHGraphProcessor } from "./processor/FlowToIHGraphProcessor";


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
    return node(
        sourceNode.getId(),
        nodeData.type,
        sourceNode.getContent(),
        nodeData.label,
        nodeData.language,
        // todo get position from sourceNode
        0,
        0,
        nodeData.width,
        nodeData.height,
    );
}


export function createCreationNode(
    id: string,
    language: Language,
    x: number,
    y: number,
): Node<NodeData> {
    return node(
        id,
        "creation",
        "",
        "",
        language,
        x,
        y,
        0,
        0
    );
}

function node(
    id: string,
    type: nodeType,
    content: string,
    label: string,
    language: Language,
    x: number,
    y: number,
    width: number,
    height: number,
): Node<NodeData> {
    return {
        id: id,
        type: type,
        data: {
            content: content,
            height: height,
            label: label,
            language: language,
            type: type,
            width: width,
        },
        position: {x: x, y: y},
        width: width,
        height: height,
    };
}
