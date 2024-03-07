import {IHGraphFactoryInterface} from "@pragmatic-programming/ihgraph";

export function exampleGraphsArduino(): IHGraphFactoryInterface {
    return {
        nodes: [
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "const int LED_PIN = 13;",
                            label: "Define",
                            language: "C",
                            status: "UNDEFINED",
                            type: "editor",
                            position: {
                                x: 0,
                                y: -200,
                            },
                            width: 300,
                            height: 200
                        }
                    }
                },
                id: "Define",
                content: "const int LED_PIN = 13;"
            },
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "pinMode(LED_PIN, OUTPUT);",
                            label: "Setup",
                            language: "C",
                            status: "UNDEFINED",
                            type: "editor",
                            position: {
                                x: 512,
                                y: 12,
                            },
                            width: 300,
                            height: 200
                        }
                    }
                },
                id: "Setup",
                content: "pinMode(LED_PIN, OUTPUT);"
            },
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "digitalWrite(LED_PIN, HIGH);\ndelay(1000);\ndigitalWrite(LED_PIN, LOW);\ndelay(1000);",
                            label: "Loop",
                            language: "C",
                            status: "UNDEFINED",
                            type: "editor",
                            position: {
                                x: 1151,
                                y: 282,
                            },
                            width: 300,
                            height: 200
                        }
                    }
                },
                id: "Loop",
                content: "digitalWrite(LED_PIN, HIGH);\ndelay(1000);\ndigitalWrite(LED_PIN, LOW);\ndelay(1000);"
            }
        ],
        edgeTypes: [
            {
                id: "sequence",
                priority: 10
            },
            {
                id: "arduino",
                priority: 9
            }
        ],
        edges: [
            {
                edgeType: "sequence",
                sourceNode: "Define",
                targetNode: "Setup"
            },
            {
                edgeType: "arduino",
                sourceNode: "Setup",
                targetNode: "Loop"
            }
        ]
    };
}
