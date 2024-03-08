import * as ihgraph from "@pragmatic-programming/ihgraph";
import { createEditorNodeData, sanitizeDataAnnotations } from "../exampleAnnotations";

export function exampleGraphsPythonTranspile(): ihgraph.IHGraphFactoryInterface {
    return sanitizeDataAnnotations({
        annotations: {},
        nodes: [
            {
                annotations: createEditorNodeData("Python"),
                id: "Python",
                content: "hello = \"World!\"\nprint(hello)\n"
            },
            {
                annotations: createEditorNodeData("JavaScript"),
                id: "JavaScript",
                content: ""
            },
            {
                annotations: createEditorNodeData(),
                id: "Result",
                content: ""
            }
        ],
        edgeTypes: [
            {
                id: "transpile",
                priority: 0,
                immediate: true
            },
            {
                id: "execute",
                priority: 1,
                immediate: false
            }
        ],
        edges: [
            {
                edgeType: "transpile",
                sourceNode: "Python",
                targetNode: "JavaScript"
            },
            {
                edgeType: "execute",
                sourceNode: "JavaScript",
                targetNode: "Result"
            }
        ]
    });
}
