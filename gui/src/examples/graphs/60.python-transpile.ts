import * as ihgraph from "ihgraph";
import { createEdgeData, createNodeData, sanitizeNodeDataLabels } from "../exampleAnnotations";

export function exampleGraphsPythonTranspile(): ihgraph.IHGraphFactoryInterface {
    return sanitizeNodeDataLabels({
        annotations: {},
        nodes: [
            {
                annotations: createNodeData("Python"),
                id: "Python",
                content: "hello = \"World!\"\nprint(hello)\n"
            },
            {
                annotations: createNodeData("JavaScript"),
                id: "JavaScript",
                content: ""
            },
            {
                annotations: createNodeData(),
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
                annotations: createEdgeData(),
                edgeType: "transpile",
                sourceNode: "Python",
                targetNode: "JavaScript"
            },
            {
                annotations: createEdgeData(),
                edgeType: "execute",
                sourceNode: "JavaScript",
                targetNode: "Result"
            }
        ]
    });
}
