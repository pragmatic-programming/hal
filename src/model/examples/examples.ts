import * as ihgraph from "ihgraph";
import example1 from "./static/example1.json";
import exampleSingleImageNode from "./static/example-single-image-node.json";
import { exampleGraphsArduinoSequence } from "./graphs/10.arduino-sequence";

export const examples = [
    {
        id: 1,
        name: "Example 1",
        value: example1,
    },
    {
        id: 2,
        name: "Single Image Node",
        value: exampleSingleImageNode,
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
                language: "JavaScript",
                width: 300,
                height: 200
            }
        };
    });

    return example;
}
