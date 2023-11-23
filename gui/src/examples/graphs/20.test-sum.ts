import { IHGraphFactoryInterface } from "ihgraph";

export function exampleGraphsWYTIWYGSum(): IHGraphFactoryInterface {
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
            },
            {
                id: "Usage",
                content:
                    `
sum(3) + sum(1);
`
            },
            {
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
                edgeType: "test",
                sourceNode: "Test 1",
                targetNode: "Function"
            },
            {
                edgeType: "test",
                sourceNode: "Test 2",
                targetNode: "Function"
            },
            {
                edgeType: "test",
                sourceNode: "Test 3",
                targetNode: "Function"
            },
            {
                edgeType: "sequence",
                sourceNode: "Function",
                targetNode: "Usage"
            },
            {
                edgeType: "execute",
                sourceNode: "Usage",
                targetNode: "Result"
            }
        ]
    };
}
