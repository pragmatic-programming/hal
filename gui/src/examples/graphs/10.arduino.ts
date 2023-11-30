import { IHGraphFactoryInterface } from "ihgraph";

export function exampleGraphsArduino(): IHGraphFactoryInterface {
    return {
        nodes: [
            {
                "annotations": {
                    "nodeData": {
                        "id": "nodeData",
                        "data": {
                            "content": "",
                            "type": "editor",
                            "label": "Defines",
                            "language": "C",
                            "width": 0,
                            "height": 0
                        }
                    }
                },
                id: "1",
                content: "const int LED_PIN = 13;"
            },
            {
                "annotations": {
                    "nodeData": {
                        "id": "nodeData",
                        "data": {
                            "content": "",
                            "type": "editor",
                            "label": "Setup",
                            "language": "C",
                            "width": 0,
                            "height": 0
                        }
                    }
                },
                id: "2",
                content: "pinMode(LED_PIN, OUTPUT);"
            },
            {
                "annotations": {
                    "nodeData": {
                        "id": "nodeData",
                        "data": {
                            "content": "",
                            "type": "editor",
                            "label": "Loop",
                            "language": "C",
                            "width": 0,
                            "height": 0
                        }
                    }
                },
                id: "3",
                content: "digitalWrite(LED_PIN, HIGH);\ndelay(1000);\ndigitalWrite(LED_PIN, LOW);\ndelay(1000);"
            }
        ],
        edgeTypes: [
            {
                id: "sequence",
                priority: 2
            },
            {
                id: "arduino",
                priority: 1
            }
        ],
        edges: [
            {
                "annotations": {
                    "edgeData": {
                        "id": "edgeData",
                        "data": {
                            "sourceHandle": "right",
                            "targetHandle": "left",
                        }
                    }
                },
                edgeType: "sequence",
                sourceNode: "1",
                targetNode: "2"
            },
            {
                "annotations": {
                    "edgeData": {
                        "id": "edgeData",
                        "data": {
                            "sourceHandle": "right",
                            "targetHandle": "left",
                        }
                    }
                },
                edgeType: "arduino",
                sourceNode: "2",
                targetNode: "3"
            }
        ]
    };
}
