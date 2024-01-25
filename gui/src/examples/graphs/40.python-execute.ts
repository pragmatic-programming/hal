import { IHGraphFactoryInterface } from "@pragmatic-programming/ihgraph";
import { createNodeData, sanitizeDataAnnotations } from "../exampleAnnotations";

export function exampleGraphsPythonExecute(): IHGraphFactoryInterface {
    return sanitizeDataAnnotations({
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
                edgeType: "execute",
                sourceNode: "Source",
                targetNode: "Result"
            }
        ]

    });
}
