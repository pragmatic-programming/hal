import { IHGraphFactoryInterface } from "@pragmatic-programming/ihgraph";
import { createEditorNodeData, sanitizeDataAnnotations } from "../exampleAnnotations";

export function exampleGraphsArduino(): IHGraphFactoryInterface {
    return sanitizeDataAnnotations({
        nodes: [
            {
                annotations: createEditorNodeData("C"),
                id: "Define",
                content: "const int LED_PIN = 13;"
            },
            {
                annotations: createEditorNodeData("C"),
                id: "Setup",
                content: "pinMode(LED_PIN, OUTPUT);"
            },
            {
                annotations: createEditorNodeData("C"),
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
    });
}
