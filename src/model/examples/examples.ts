import * as ihgraph from "ihgraph";
import exampleJavaScriptSequence from "./static/example-javascript-sequence.json";
import exampleSCChart from "./static/example-scchart.json";
import { exampleGraphsArduinoSequence } from "./graphs/10.arduino-sequence";

export const examples = [
    {
        id: 1,
        name: "JavaScript Sequence",
        value: exampleJavaScriptSequence,
    },
    {
        id: 2,
        name: "SCChart",
        value: exampleSCChart,
    },
    {   id: 3,
        name: "Example 3",
        value: addDefaultAnnotations(exampleGraphsArduinoSequence())
    }
];

function addDefaultAnnotations(example: ihgraph.IHGraphFactoryInterface): ihgraph.IHGraphFactoryInterface {
    example.nodes.forEach(node => {
        if (!node.annotations) {
            node.annotations = {} as ihgraph.AnnotationFactoryType;
        }
        node.annotations["nodeData"] = {
            id: "nodeData",
            data: {
                label: node.id,
                type: "editor",
                content: node.content ? node.content : "",
                language: "C",
                width: 300,
                height: 200
            }
        };
    });

    return example;
}