import { IHGraphFactoryInterface } from "@pragmatic-programming/ihgraph";

export function exampleGraphsSCChart(): IHGraphFactoryInterface {
    return {
        nodes: [
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            content: "",
                            type: "editor",
                            label: "Declaration",
                            language: "PlainText",
                            width: 0,
                            height: 0
                        }
                    }
                },
                id: "1",
                content: "scchart DrBVB {\n  input bool hsecond\n  input bool btnMid, btnNorth, btnSouth \n  output string display0, display1, display2\n  input output int sound = 0\n  output int scoreHome = 0, scoreGuest = 0\n  \n  initial state Start \n  { entry do display0 = \"Dr. BVB\"\n    entry do display1 = \"0 : 0\"\n  }\n  if btnMid go to kickoff\n  \n  state kickoff\n  { entry do sound = 1 }\n  if 2 hsecond go to play\n  \n  state play\n  if btnNorth go to Goal0\n  if btnSouth go to Goal1\n    \n  state Goal0\n  { entry do scoreHome++ \n    entry do sound = 2\n  }\n  if scoreHome == 5 go to GameOverPrimer\n  if btnMid go to kickoff\n  \n  state Goal1\n  { entry do scoreGuest++ \n    entry do sound = 3\n  }\n  if scoreGuest == 5 go to GameOverPrimer\n  if btnMid go to kickoff\n  \n  state GameOverPrimer\n  if 10 hsecond go to GameOverDecider\n  \n  connector state GameOverDecider\n  immediate if scoreHome > scoreGuest go to GameOverDisplayTim\n  immediate go to GameOver\n  \n  state GameOverDisplayTim\n  {entry do display0 = \"Dr. Tim\" }\n  immediate go to GameOver \n  \n  state GameOver\n  { entry do sound = 4 }\n  if btnMid go to kickoff\n}"
            },
            {
                annotations: {
                    nodeData: {
                        id: "nodeData",
                        data: {
                            type: "image",
                            content: "",
                            width: 0,
                            height: 0
                        }
                    }
                },
                id: "2",
                content: ""
            }
        ],
        edgeTypes: [
            {
                id: "scchartdiagram",
                priority: 8,
                immediate: false
            }
        ],
        edges: [
            {
                annotations: {
                    edgeData: {
                        id: "edgeData",
                        data: {
                            sourceHandle: "right",
                            targetHandle: "left",
                        }
                    }
                },
                edgeType: "scchartdiagram",
                sourceNode: "1",
                targetNode: "2"
            }
        ]
    };
}
