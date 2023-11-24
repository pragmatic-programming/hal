import { IHGraphFactoryInterface } from "ihgraph";

export function exampleGraphsPythonExecute(): IHGraphFactoryInterface {
    return {

        "nodes": [
            {
                "annotations": {
                    "nodeData": {
                        "id": "nodeData",
                        "data": {
                            "content": "",
                            "type": "editor",
                            "label": "Source",
                            "language": "Python",
                            "width": 500,
                            "height": 600
                        }
                    }
                },
                "id": "1",
                "content": "x = 1\nif x == 1:\n# indented four spaces\n    print(\"x is 1.\")"
            },
            {
                "annotations": {
                    "nodeData": {
                        "id": "nodeData",
                        "data": {
                            "content": "",
                            "type": "editor",
                            "label": "Result",
                            "language": "PlainText",
                            "width": 300,
                            "height": 200
                        }
                    }
                },
                "id": "2",
                "content": ""
            }
        ],
        "edgeTypes": [
            {
                "id": "execute",
                "priority": 8,
                "immediate": false
            }
        ],
        "edges": [
            {
                "edgeType": "execute",
                "sourceNode": "1",
                "targetNode": "2"
            }
        ]

    };
}
