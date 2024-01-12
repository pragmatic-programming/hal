import { IHGraphFactoryInterface } from "ihgraph";
import { createEdgeData, createNodeData, sanitizeNodeDataLabels } from "../exampleAnnotations";

export function exampleGraphsPythonExecute(): IHGraphFactoryInterface {
    return sanitizeNodeDataLabels({
        nodes: [
            {
                annotations: createNodeData("Python"),
                id: "Source",
                content: "x = 1\nif x == 1:\n# indented four spaces\n    print(\"x is 1.\")"
            },
            {
                annotations: createNodeData(),
                id: "Result",
                content: ""
            }
        ],
        edgeTypes: [
            {
                id: "execute",
                priority: 8,
                immediate: false
            }
        ],
        edges: [
            {
                annotations: createEdgeData(),
                edgeType: "execute",
                sourceNode: "Source",
                targetNode: "Result"
            }
        ]

    });
}
