import { IHGraphFactoryInterface } from "ihgraph";

export function exampleGraphsArduinoSequence(): IHGraphFactoryInterface {
    return {
        nodes: [
            {
                id: "Defines",
                content: "const int LED_PIN = 13;"
            },
            {
                id: "Setup",
                content: "pinMode(LED_PIN, OUTPUT);"
            },
            {
                id: "Loop",
                content: "digitalWrite(LED_PIN, HIGH);\ndelay(1000);\ndigitalWrite(LED_PIN, LOW);\ndelay(1000);"
            }
        ],
        edgeTypes: [
            {
                id: "sequence",
                priority: 1
            }
        ],
        edges: [
            {
                edgeType: "sequence",
                sourceNode: "Defines",
                targetNode: "Setup"
            },
            {
                edgeType: "sequence",
                sourceNode: "Setup",
                targetNode: "Loop"
            }
        ]
    };
}
