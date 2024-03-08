import { IHGraphFactoryInterface } from "@pragmatic-programming/ihgraph";
import { exampleGraphsArduino } from "./10.arduino";
import { createEditorNodeData, sanitizeDataAnnotations } from "../exampleAnnotations";

export function exampleGraphsArduinoCompile(): IHGraphFactoryInterface {
    return sanitizeDataAnnotations({
        ...exampleGraphsArduino(),
        nodes: [...exampleGraphsArduino().nodes,
            {
                annotations: createEditorNodeData("C"),
                id: "Result",
                content: ""
            },
            {
                annotations: createEditorNodeData("C"),
                id: "Deploy",
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
                edgeType: "arduinoCompile",
                sourceNode: "Loop",
                targetNode: "Result"
            },
            {
                edgeType: "arduinoDeploy",
                sourceNode: "Result",
                targetNode: "Deploy"
            }
        ]
    });
}
