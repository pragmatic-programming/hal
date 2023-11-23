import * as ihgraph from "ihgraph";

export function exampleGraphsPythonTranspile(): ihgraph.IHGraphFactoryInterface {
    return {
        "annotations": {},
        "nodes": [
            {
                "id": "1",
                "content": "hello = \"World!\""
            },
        ],
        "edgeTypes": [],
        "edges": []
    };
}
