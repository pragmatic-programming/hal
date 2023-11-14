import * as ihgraph from "ihgraph";

export function exampleGraphsJavaScriptSequence(): ihgraph.IHGraphFactoryInterface {
    return {
        "nodes": [
            {
                "annotations": {
                    "nodeData": {
                        "id": "nodeData",
                        "data": {
                            "content": "var x = 1;",
                            "type": "editor",
                            "label": "Declaration",
                            "language": "JavaScript",
                            "width": 300,
                            "height": 200
                        }
                    }
                },
                "id": "1",
                "content": "var x = 1;"
            },
            {
                "annotations": {
                    "nodeData": {
                        "id": "nodeData",
                        "data": {
                            "content": "x + 2;",
                            "type": "editor",
                            "label": "Usage",
                            "language": "JavaScript",
                            "width": 300,
                            "height": 200
                        }
                    }
                },
                "id": "2",
                "content": "x + 2;"
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
                "id": "3",
                "content": ""
            }
        ],
        "edgeTypes": [
            {
                "id": "sequence",
                "priority": 8,
                "immediate": false
            },
            {
                "id": "execute",
                "priority": 2,
                "immediate": false
            }
        ],
        "edges": [
            {
                "edgeType": "sequence",
                "sourceNode": "1",
                "targetNode": "2"
            },
            {
                "edgeType": "execute",
                "sourceNode": "2",
                "targetNode": "3"
            }
        ]

    };
}
