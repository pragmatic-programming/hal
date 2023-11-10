import * as ihgraph from "ihgraph";
import { IHGraphFactoryInterface } from "ihgraph";
import exampleJavaScriptSequence from "./static/example-javascript-sequence.json";
import exampleSCChart from "./static/example-scchart.json";
import { exampleGraphsArduinoSequence } from "./graphs/10.arduino-sequence";
import { exampleGraphsWYTIWYGSum } from "./graphs/20.wytiwyg-sum";

export interface Example {
    id: number,
    name: string,
    value: IHGraphFactoryInterface,
}

export const examples: Example[] = [
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
    {
        id: 3,
        name: "Example 3",
        value: addDefaultAnnotations(exampleGraphsArduinoSequence())
    },
    {
        id: 4,
        name: "Unit Test",
        value: addDefaultAnnotations(exampleGraphsWYTIWYGSum())
    }
];

function addDefaultAnnotations(example: ihgraph.IHGraphFactoryInterface): IHGraphFactoryInterface {
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
