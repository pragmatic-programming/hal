import * as ihgraph from "ihgraph";
import { IHGraphFactoryInterface } from "ihgraph";
import exampleJavaScriptSequence from "./static/example-javascript-sequence.json";
import exampleSCChart from "./static/example-scchart.json";
import { exampleGraphsArduinoSequence } from "./graphs/10.arduino-sequence";
import { exampleGraphsWYTIWYGSum } from "./graphs/20.wytiwyg-sum";
import { LanguageIndicator } from "../node/LanguageIndicator";
import { Example } from "./Example";
import TableChartIcon from "@mui/icons-material/TableChart";
import BiotechIcon from "@mui/icons-material/Biotech";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";

export const examples: Example[] = [
    {
        id: 1,
        name: "JavaScript Sequence",
        value: exampleJavaScriptSequence,
        icon: KeyboardDoubleArrowRightIcon,
    },
    {
        id: 2,
        name: "SCChart",
        value: exampleSCChart,
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

    return example;
}
