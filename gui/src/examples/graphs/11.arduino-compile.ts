import { IHGraphFactoryInterface } from "ihgraph";
import { exampleGraphsArduino } from "./10.arduino";

export function exampleGraphsArduinoCompile(): IHGraphFactoryInterface {
    return {
        ...exampleGraphsArduino(),
        nodes: [...exampleGraphsArduino().nodes,
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "",
                            type: "editor",
                            label: "Compile Result",
                            language: "C",
                            width: 0,
                            height: 0
                        }
                    }
                },
                id: "4",
                content: ""
            },
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "",
                            type: "editor",
                            label: "Deploy",
                            language: "C",
                            width: 0,
                            height: 0
                        }
                    }
                },
                id: "5",
                content: ""
            }
        ],
        edgeTypes: [...exampleGraphsArduino().edgeTypes,
            {
                id: "arduinoCompile",
                priority: 5
            },
            {
                id: "arduinoDeploy",
                priority: 4
            }
        ],
        edges: [...exampleGraphsArduino().edges,
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
                edgeType: "arduinoCompile",
                sourceNode: "3",
                targetNode: "4"
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
                edgeType: "arduinoDeploy",
                sourceNode: "4",
                targetNode: "5"
            }
        ]
    }
}
