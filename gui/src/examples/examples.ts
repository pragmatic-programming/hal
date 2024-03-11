import HardwareIcon from "@mui/icons-material/Hardware";
import {Example} from "./Example";
import TableChartIcon from "@mui/icons-material/TableChart";
import BiotechIcon from "@mui/icons-material/Biotech";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import GestureIcon from "@mui/icons-material/Gesture";
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import TokenIcon from '@mui/icons-material/Token';
import arduino10 from "./graphs/10.arduino.json";
import arduinoCompile11 from "./graphs/11.arduino-compile.json";
import testSum20 from "./graphs/20.test-sum.json";
import scchart30 from "./graphs/30.scchart.json";
import pythonExecute40 from "./graphs/40.python-execute.json";
import pythonTranspile60 from "./graphs/60.python-transpile.json";
import promptEngineering70 from "./graphs/70.prompt-engineering.json";
import javaScriptExecute50 from "./graphs/50.javascript-sequence.json";
import class80 from "./graphs/80.class.json";

export const examples: Example[] = [
    {
        id: 1,
        name: "JavaScript Sequence",
        value: javaScriptExecute50,
        icon: KeyboardDoubleArrowRightIcon,
    },
    {
        id: 2,
        name: "SCChart",
        value: scchart30,
        icon: TableChartIcon,
    },
    {
        id: 3,
        name: "Arduino",
        value: arduino10,
        icon: DeveloperBoardIcon,
    },
    {
        id: 4,
        name: "Arduino Compile",
        value: arduinoCompile11,
        icon: DeveloperBoardIcon,
    },
    {
        id: 5,
        name: "Unit Test",
        value: testSum20,
        icon: BiotechIcon,
    },
    {
        id: 6,
        name: "Python Execute",
        value: pythonExecute40,
        icon: GestureIcon,
    },
    {
        id: 7,
        name: "Python Transpile",
        value: pythonTranspile60,
        icon: HardwareIcon,
    },
    {
        id: 8,
        name: "AI Prompt Engineering",
        value: promptEngineering70,
        icon: AirlineStopsIcon,
    },
    {
        id: 9,
        name: "Class",
        value: class80,
        icon: TokenIcon,
    },
];
