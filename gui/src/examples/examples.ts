import * as ihgraph from "ihgraph";
import { IHGraphFactoryInterface } from "ihgraph";
import { exampleGraphsArduinoSequence } from "./graphs/10.arduino-sequence";
import { exampleGraphsWYTIWYGSum } from "./graphs/20.test-sum";
import { LanguageIndicator } from "../model/node/LanguageIndicator";
import { Example } from "./Example";
import TableChartIcon from "@mui/icons-material/TableChart";
import BiotechIcon from "@mui/icons-material/Biotech";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import GestureIcon from "@mui/icons-material/Gesture";
import { exampleGraphsSCChart } from "./graphs/30.scchart";
import { exampleGraphsPython } from "./graphs/40.python";
import { exampleGraphsJavaScriptSequence } from "./graphs/50.javascript-sequence";

export const examples: Example[] = [
    {
        id: 1,
        name: "JavaScript Sequence",
        value: addDefaultAnnotations(exampleGraphsJavaScriptSequence(), "JavaScript"),
        icon: KeyboardDoubleArrowRightIcon,
    },
    {
        id: 2,
        name: "SCChart",
        value: addDefaultAnnotations(exampleGraphsSCChart(), "C"),
        icon: TableChartIcon,
    },
    {
        id: 3,
        name: "Arduino",
        value: addDefaultAnnotations(exampleGraphsArduinoSequence(), "C"),
        icon: DeveloperBoardIcon,
    },
    {
        id: 4,
        name: "Unit Test",
        value: addDefaultAnnotations(exampleGraphsWYTIWYGSum(), "JavaScript"),
        icon: BiotechIcon,
    },
    {
        id: 5,
        name: "Python",
        value: addDefaultAnnotations(exampleGraphsPython(), "Python"),
        icon: GestureIcon,
    }
];

function addDefaultAnnotations(example: ihgraph.IHGraphFactoryInterface, languageIndicator: LanguageIndicator): IHGraphFactoryInterface {
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
                language: languageIndicator,
                width: 300,
                height: 200
            }
        };
    });
    example.edges.forEach(edge => {
        if (!edge.annotations) {
            edge.annotations = {} as ihgraph.AnnotationFactoryType;
        }
        edge.annotations["edgeData"] = {
            id: "edgeData",
            data: {
                sourceHandle: "right",
                targetHandle: "left",
            }
        };
    });

    return example;
}
