import * as ihgraph from "ihgraph";

export function exampleGraphsPythonTranspile(): ihgraph.IHGraphFactoryInterface {
    return {
        "annotations": {},
        "nodes": [
            {
                "id": "Hello World!",
                "content": "hello = \"World!\""
            },
        ],
        "edgeTypes": [],
        "edges": []
    };
}
