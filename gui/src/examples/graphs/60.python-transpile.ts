import * as ihgraph from "ihgraph";

export function exampleGraphsPythonTranspile(): ihgraph.IHGraphFactoryInterface {
    return {
        annotations: {},
        nodes: [
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "",
                            type: "editor",
                            label: "Python",
                            language: "Python",
                            width: 0,
                            height: 0
                        }
                    }
                },
                id: "1",
                content: "hello = \"World!\"\nprint(hello)\n"
            },
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "",
                            type: "editor",
                            label: "JavaScript",
                            language: "JavaScript",
                            width: 0,
                            height: 0
                        }
                    }
                },
                id: "2",
                content: ""
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
                id: "transpile",
                priority: 0,
                immediate: true
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
                edgeType: "transpile",
                sourceNode: "1",
                targetNode: "2"
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
                sourceNode: "2",
                targetNode: "6"
            }
        ]
    };
}
