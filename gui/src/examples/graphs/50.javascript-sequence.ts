import { IHGraphFactoryInterface } from "ihgraph";
import { createEdgeData, createNodeData, sanitizeNodeDataLabels } from "../exampleAnnotations";

export function exampleGraphsJavaScriptSequence(): IHGraphFactoryInterface {
    return sanitizeNodeDataLabels({
        nodes: [
            {
                annotations: createNodeData("JavaScript"),
                id: "Define",
                content: "var x = 1;"
            },
            {
                annotations: createNodeData("JavaScript"),
                id: "Usage",
                content: "x + 2;"
            },
            {
                annotations: createNodeData(),
                id: "Result",
                content: ""
            }
        ],
        edgeTypes: [
            {
                id: "sequence",
                priority: 8,
                immediate: false
            },
            {
                id: "execute",
                priority: 2,
                immediate: false
            }
        ],
        edges: [
            {
                annotations: createEdgeData(),
                edgeType: "sequence",
                sourceNode: "Define",
                targetNode: "Usage"
            },
            {
                annotations: createEdgeData(),
                edgeType: "execute",
                sourceNode: "Usage",
                targetNode: "Result"
            }
        ]

    });
}
