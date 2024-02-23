import HardwareIcon from "@mui/icons-material/Hardware";
import { exampleGraphsArduino } from "./graphs/10.arduino";
import { exampleGraphsWYTIWYGSum } from "./graphs/20.test-sum";
import { Example } from "./Example";
import TableChartIcon from "@mui/icons-material/TableChart";
import BiotechIcon from "@mui/icons-material/Biotech";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import GestureIcon from "@mui/icons-material/Gesture";
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import { exampleGraphsArduinoCompile } from "./graphs/11.arduino-compile";
import { exampleGraphsSCChart } from "./graphs/30.scchart";
import { exampleGraphsPythonExecute } from "./graphs/40.python-execute";
import { exampleGraphsJavaScriptSequence } from "./graphs/50.javascript-sequence";
import { exampleGraphsPythonTranspile } from "./graphs/60.python-transpile";
import { exampleGraphsPromptEngineering } from "./graphs/70.prompt-engineering";


export const examples: Example[] = [
    {
        id: 1,
        name: "JavaScript Sequence",
        value: exampleGraphsJavaScriptSequence(),
        icon: KeyboardDoubleArrowRightIcon,
    },
    {
        id: 2,
        name: "SCChart",
        value: exampleGraphsSCChart(),
        icon: TableChartIcon,
    },
    {
        id: 3,
        name: "Arduino",
        value: exampleGraphsArduino(),
        icon: DeveloperBoardIcon,
    },
    {
        id: 4,
        name: "Arduino Compile",
        value: exampleGraphsArduinoCompile(),
        icon: DeveloperBoardIcon,
    },
    {
        id: 5,
        name: "Unit Test",
        value: exampleGraphsWYTIWYGSum(),
        icon: BiotechIcon,
    },
    {
        id: 6,
        name: "Python Execute",
        value: exampleGraphsPythonExecute(),
        icon: GestureIcon,
    },
    {
        id: 7,
        name: "Python Transpile",
        value: exampleGraphsPythonTranspile(),
        icon: HardwareIcon,
    },
    {
        id: 7,
        name: "AI Prompt Engineering",
        value: exampleGraphsPromptEngineering(),
        icon: AirlineStopsIcon,
    },
];
