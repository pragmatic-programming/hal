import * as ihgraph from "ihgraph";

export function exampleGraphsWYTIWYGSum(): ihgraph.IHGraphFactoryInterface {
    return {
        nodes: [
            {
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
                id: "Test 1",
                content: "sum(3) == 6"
            },
            {
                id: "Test 2",
                content: "sum(1)"
            },
            {
                id: "Test 3",
                content: "sum(-1) == -1"
            }
        ],
        edgeTypes: [
            {
                id: "wytiwyg",
                priority: 0,
                immediate: true
            }
        ],
        edges: [
            {
                edgeType: "wytiwyg",
                sourceNode: "Test 1",
                targetNode: "Function"
            },
            {
                edgeType: "wytiwyg",
                sourceNode: "Test 2",
                targetNode: "Function"
            },
            {
                edgeType: "wytiwyg",
                sourceNode: "Test 3",
                targetNode: "Function"
            },
        ]
    };
}
