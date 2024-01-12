import { AnnotationFactoryType, IHGraphFactoryInterface, SourceNodeInterface } from "ihgraph";

export function createNodeData(language: string = "PlainText", type: string = "editor", label: string = ""): AnnotationFactoryType {
    return {
        nodeData: {
        id: "nodeData",
        data: {
            content: "",
            type: type,
            label: label,
            language: language,
            width: 0,
            height: 0
            }
        }
    }
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
    }
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