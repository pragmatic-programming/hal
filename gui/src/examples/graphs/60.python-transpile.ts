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
                content: "hello = \"World!\""
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
        ],
        edgeTypes: [
            {
                id: "transpile",
                priority: 1,
                immediate: true
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
            }
        ]
    };
}
