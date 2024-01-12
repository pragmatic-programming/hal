import { IHGraphFactoryInterface } from "ihgraph";
import { createNodeData, sanitizeDataAnnotations } from "../exampleAnnotations";

export function exampleGraphsJavaScriptSequence(): IHGraphFactoryInterface {
    return sanitizeDataAnnotations({
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
                edgeType: "sequence",
                sourceNode: "Define",
                targetNode: "Usage"
            },
            {
                edgeType: "execute",
                sourceNode: "Usage",
                targetNode: "Result"
            }
        ]

    });
}
