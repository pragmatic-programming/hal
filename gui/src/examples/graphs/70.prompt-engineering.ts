import * as ihgraph from "ihgraph";
import { createNodeData, sanitizeDataAnnotations } from "../exampleAnnotations";

export function exampleGraphsPromptEngineering(): ihgraph.IHGraphFactoryInterface {
    return sanitizeDataAnnotations({
        annotations: {},
        nodes: [
            {
                annotations: createNodeData(),
                id: "Prompt",
                content: "hello = \"World!\"\nprint(hello)\n"
            },
            {
                annotations: createNodeData(),
                id: "Precursor",
                content: ""
            },
            {
                annotations: createNodeData(),
                id: "Key",
                content: ""
            },
            {
                annotations: createNodeData(),
                id: "Request",
                content: ""
            },
            {
                annotations: createNodeData(),
                id: "Response",
                content: ""
            },
            {
                annotations: createNodeData(),
                id: "Result",
                content: ""
            }
        ],
        edgeTypes: [
            {
                id: "promptframe",
                priority: 16,
                immediate: true
            },
            {
                id: "gptrequest",
                priority: 8,
                immediate: false
            },
            {
                id: "scchartdiagram",
                priority: 4,
                immediate: false
            }
        ],
        edges: [
            {
                edgeType: "promptframe",
                sourceNode: "Prompt",
                targetNode: "Request"
            },
            {
                edgeType: "promptframe",
                sourceNode: "Precursor",
                targetNode: "Request"
            },
            {
                edgeType: "promptframe",
                sourceNode: "Key",
                targetNode: "Request"
            },
            {
                edgeType: "gptrequest",
                sourceNode: "Request",
                targetNode: "Response"
            },
            {
                edgeType: "scchartdiagram",
                sourceNode: "Response",
                targetNode: "Result"
            }
        ]
    });
}
