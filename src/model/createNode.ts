import { SourceNode, TransformationEdge } from "ihgraph";
import { Node } from "reactflow";
import NodeData from "./NodeData";
import { nodeType } from "../ui/flow/flow/NodeTypes";
import { Language } from "./Languages";
import { FlowToIHGraphProcessor } from "./processor/FlowToIHGraphProcessor";


export function createNodeFromSourceNode(sourceNode: SourceNode): Node<NodeData> {
    let nodeData: NodeData = {label: "unknown", language: "JavaScript", content: ""};
    if (sourceNode.hasAnnotation(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA)) {
        nodeData = sourceNode.getAnnotationData<NodeData>(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA);
    }
    const executeEdge = sourceNode
        .getIncomingEdges()
        .find((edge: TransformationEdge) => edge.getType().getId() === "execute");
    return node(
        sourceNode.getId(),
        executeEdge ? "result" : "editor",
        sourceNode.getContent(),
        nodeData.label,
        nodeData.language,
        // todo get position from sourceNode
        0,
        0
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
): Node<NodeData> {
    return {
        id: id,
        type: type,
        data: {
            content: content,
            label: label,
            language: language,
        },
        position: {x: x, y: y},
    };
}
