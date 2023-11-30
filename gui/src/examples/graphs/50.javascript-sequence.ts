import { IHGraphFactoryInterface } from "ihgraph";

export function exampleGraphsJavaScriptSequence(): IHGraphFactoryInterface {
    return {
        nodes: [
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "",
                            type: "editor",
                            label: "Declaration",
                            language: "JavaScript",
                            width: 0,
                            height: 0
                        }
                    }
                },
                id: "1",
                content: "var x = 1;"
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
                id: "2",
                content: "x + 2;"
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
                id: "3",
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
                targetNode: "3"
            }
        ]

    };
}
