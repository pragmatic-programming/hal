import { IHGraphFactoryInterface } from "ihgraph";

export function exampleGraphsWYTIWYGSum(): IHGraphFactoryInterface {
    return {
        nodes: [
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "",
                            type: "editor",
                            label: "Function",
                            language: "JavaScript",
                            width: 0,
                            height: 0
                        }
                    }
                },
                id: "1",
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
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "",
                            type: "editor",
                            label: "Test 1",
                            language: "JavaScript",
                            width: 0,
                            height: 0
                        }
                    }
                },
                id: "2",
                content: "sum(3) == 6"
            },
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "",
                            type: "editor",
                            label: "Test 2",
                            language: "JavaScript",
                            width: 0,
                            height: 0
                        }
                    }
                },
                id: "3",
                content: "sum(1)"
            },
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "",
                            type: "editor",
                            label: "Test 3",
                            language: "JavaScript",
                            width: 0,
                            height: 0
                        }
                    }
                },
                id: "4",
                content: "sum(-1) == -1"
            },
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "",
                            type: "editor",
                            label: "Usage",
                            language: "JavaScript",
                            width: 0,
                            height: 0
                        }
                    }
                },
                id: "5",
                content:
                    `sum(3) + sum(1);`
            },
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "",
                            type: "editor",
                            label: "Result",
                            language: "PlainText",
                            width: 0,
                            height: 0
                        }
                    }
                },
                id: "6",
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
                annotations: {
                    edgeData: {
                        id: "edgeData",
                        data: {
                            sourceHandle: "right",
                            targetHandle: "left",
                        }
                    }
                },
                edgeType: "test",
                sourceNode: "2",
                targetNode: "1"
            },
            {
                annotations: {
                    edgeData: {
                        id: "edgeData",
                        data: {
                            sourceHandle: "right",
                            targetHandle: "left",
                        }
                    }
                },
                edgeType: "test",
                sourceNode: "3",
                targetNode: "1"
            },
            {
                annotations: {
                    edgeData: {
                        id: "edgeData",
                        data: {
                            sourceHandle: "right",
                            targetHandle: "left",
                        }
                    }
                },
                edgeType: "test",
                sourceNode: "4",
                targetNode: "1"
            },
            {
                annotations: {
                    edgeData: {
                        id: "edgeData",
                        data: {
                            sourceHandle: "right",
                            targetHandle: "left",
                        }
                    }
                },
                edgeType: "sequence",
                sourceNode: "1",
                targetNode: "5"
            },
            {
                annotations: {
                    edgeData: {
                        id: "edgeData",
                        data: {
                            sourceHandle: "right",
                            targetHandle: "left",
                        }
                    }
                },
                edgeType: "execute",
                sourceNode: "5",
                targetNode: "6"
            }
        ]
    };
}
