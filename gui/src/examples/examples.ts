import HardwareIcon from "@mui/icons-material/Hardware";
import { AnnotationFactoryType, IHGraphFactoryInterface, SourceNodeStatus } from "ihgraph";
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
import { exampleGraphsPythonExecute } from "./graphs/40.python-execute";
import { exampleGraphsJavaScriptSequence } from "./graphs/50.javascript-sequence";
import { exampleGraphsPythonTranspile } from "./graphs/60.python-transpile";
import { NodeDataFactory } from "../model/node/NodeDataFactory";


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
        name: "Python Execute",
        value: addDefaultAnnotations(exampleGraphsPythonExecute(), "Python"),
        icon: GestureIcon,
    },
    {
        id: 6,
        name: "Python Transpile",
        value: addDefaultAnnotations(exampleGraphsPythonTranspile(), "Python"),
        icon: HardwareIcon,
    }
];

function addDefaultAnnotations(example: IHGraphFactoryInterface, languageIndicator: LanguageIndicator): IHGraphFactoryInterface {
    example.nodes.forEach(node => {
        if (!node.annotations) {
            node.annotations = {} as AnnotationFactoryType;
        }
        node.annotations["nodeData"] = {
            id: "nodeData",
            data: NodeDataFactory.nodeDataEditor(
                node.content ? node.content : "",
                node.id,
                languageIndicator,
                SourceNodeStatus.UNDEFINED,
            )
        };
    });
    example.edges.forEach(edge => {
        if (!edge.annotations) {
            edge.annotations = {} as AnnotationFactoryType;
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

