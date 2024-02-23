import { IHGraphFactoryInterface } from "@pragmatic-programming/ihgraph";
import { exampleGraphsArduino } from "./10.arduino";
import { createNodeData, sanitizeDataAnnotations } from "../exampleAnnotations";

export function exampleGraphsArduinoCompile(): IHGraphFactoryInterface {
    return {
        ...exampleGraphsArduino(),
        nodes: [...exampleGraphsArduino().nodes,
            {
                annotations: createNodeData("C"),
                id: "Result",
                content: ""
            },
            {
                annotations: createNodeData("C"),
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
    }
}
