import {
    AnnotationFactoryType,
    IHGraphFactoryInterface,
    SimpleNodeStatus,
    SourceNodeInterface
} from "@pragmatic-programming/ihgraph";
import { AnnotationWithNodeData } from "./AnnotationWithNodeData";
import { LanguageIndicator } from "../model/node/LanguageIndicator";
import { NodeDataEditor, NodeDataFile, NodeDataImage } from "../model/node/NodeData";

export function createFileNodeData(): AnnotationWithNodeData<NodeDataFile> {
    return {
        nodeData: {
            id: "nodeData",
            // todo use NodeDataFactory
            data: {
                content: "",
                type: "file",
                fileType: undefined,
                x: 0,
                y: 0,
                width: 300,
                height: 200,
            }
        }
    };
}


export function createEditorNodeData(language: LanguageIndicator = "PlainText", label: string = ""): AnnotationWithNodeData<NodeDataEditor> {
    return {
        nodeData: {
            id: "nodeData",
            // todo use NodeDataFactory
            data: {
                content: "",
                type: "editor",
                label: label,
                language: language,
                x: 0,
                y: 0,
                width: 300,
                height: 200,
                status: SimpleNodeStatus.UNDEFINED,
            }
        }
    };
}

export function createImageNodeData(): AnnotationWithNodeData<NodeDataImage> {
    return {
        nodeData: {
            id: "nodeData",
            // todo use NodeDataFactory
            data: {
                content: "",
                type: "image",
                x: 0,
                y: 0,
                width: 300,
                height: 200,
                status: SimpleNodeStatus.UNDEFINED,
            }
        }
    };
}

export function createEdgeData(): AnnotationFactoryType {
    return {
        edgeData: {
            id: "edgeData",
            data: {
                sourceHandle: "right",
                targetHandle: "left",
            }
        }
    };
}

export function sanitizeDataAnnotations(graph: IHGraphFactoryInterface): IHGraphFactoryInterface {
    graph.nodes.forEach((node: SourceNodeInterface) => {
        if (node.annotations && node.annotations.nodeData && node.annotations.nodeData.data) {
            if (!node.annotations.nodeData.data.label || node.annotations.nodeData.data.label === "") {
                node.annotations.nodeData.data.label = node.id;
            }
        }
    });

    graph.edges.forEach((edge) => {
        if (!edge.annotations) {
            edge.annotations = {} as AnnotationFactoryType;
        }
        if (!edge.annotations.edgeData || !edge.annotations.edgeData.data) {
            edge.annotations = createEdgeData();
        }
    });

    return graph;
}
