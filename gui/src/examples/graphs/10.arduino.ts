import { IHGraphFactoryInterface } from "@pragmatic-programming/ihgraph";
import { createNodeData, sanitizeDataAnnotations } from "../exampleAnnotations";

export function exampleGraphsArduino(): IHGraphFactoryInterface {
    return sanitizeDataAnnotations({
        nodes: [
            {
                annotations: createNodeData("C"),
                id: "Define",
                content: "const int LED_PIN = 13;"
            },
            {
                annotations: createNodeData("C"),
                id: "Setup",
                content: "pinMode(LED_PIN, OUTPUT);"
            },
            {
                annotations: createNodeData("C"),
                id: "Loop",
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
    });
}
