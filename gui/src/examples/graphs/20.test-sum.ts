import { IHGraphFactoryInterface } from "ihgraph";
import { createEdgeData, createNodeData, sanitizeNodeDataLabels } from "../exampleAnnotations";

export function exampleGraphsWYTIWYGSum(): IHGraphFactoryInterface {
    return sanitizeNodeDataLabels({
        nodes: [
            {
                annotations: createNodeData("JavaScript"),
                id: "Function",
                content:
`function sum(n) {
    if (n > 0) {
        return n + sum(n - 1);
    } else {
        return 0;
    }
}`
            },
            {
                annotations: createNodeData("JavaScript"),
                id: "Test 1",
                content: "sum(3) == 6"
            },
            {
                annotations: createNodeData("JavaScript"),
                id: "Test 2",
                content: "sum(1)"
            },
            {
                annotations: createNodeData("JavaScript"),
                id: "Test 3",
                content: "sum(-1) == -1"
            },
            {
                annotations: createNodeData("JavaScript"),
                id: "Usage",
                content: `sum(3) + sum(1);`
            },
            {
                annotations: createNodeData(),
                id: "Result",
                content: ""
            }
        ],
        edgeTypes: [
            {
                id: "test",
                priority: 0,
                immediate: true
            },
            {
                id: "sequence",
                priority: 2,
                immediate: false
            },
            {
                id: "execute",
                priority: 1,
                immediate: false
            }
        ],
        edges: [
            {
                annotations: createEdgeData(),
                edgeType: "test",
                sourceNode: "Test 1",
                targetNode: "Function"
            },
            {
                annotations: createEdgeData(),
                edgeType: "test",
                sourceNode: "Test 2",
                targetNode: "Function"
            },
            {
                annotations: createEdgeData(),
                edgeType: "test",
                sourceNode: "Test 3",
                targetNode: "Function"
            },
            {
                annotations: createEdgeData(),
                edgeType: "sequence",
                sourceNode: "Function",
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
