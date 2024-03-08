import { IHGraphFactoryInterface } from "@pragmatic-programming/ihgraph";
import { createEditorNodeData, sanitizeDataAnnotations } from "../exampleAnnotations";

export function exampleGraphsJavaScriptSequence(): IHGraphFactoryInterface {
    return sanitizeDataAnnotations({
        nodes: [
            {
                annotations: createEditorNodeData("JavaScript"),
                id: "Define",
                content: "var x = 1;"
            },
            {
                annotations: createEditorNodeData("JavaScript"),
                id: "Usage",
                content: "x + 2;"
            },
            {
                annotations: createEditorNodeData(),
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
