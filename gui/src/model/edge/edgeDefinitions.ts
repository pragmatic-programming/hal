import { EdgeDefinition } from "./EdgeDefinition";
import EdgeCreate from "../../ui/flow/edge/EdgeCreate";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import BiotechIcon from "@mui/icons-material/Biotech";
import AddIcon from "@mui/icons-material/Add";
import HardwareIcon from "@mui/icons-material/Hardware";
import TableChartIcon from "@mui/icons-material/TableChart";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import EdgeDefault from "../../ui/flow/edge/EdgeDefault";
import { ExecuteProcessor } from "../../processor/edgeTypes/execute/ExecuteProcessor";
import { SCChartDiagramProcessor } from "../../processor/edgeTypes/scchart/SCChartDiagramProcessor";
import { TestProcessor } from "../../processor/edgeTypes/TestProcessor";
import { CreateProcessor } from "../../processor/edgeTypes/CreateProcessor";
import { SCChartCodeProcessor } from "../../processor/edgeTypes/scchart/SCChartCodeProcessor";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { TranspileProcessor } from "../../processor/edgeTypes/transpile/TranspileProcessor";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import { ArduinoProcessor } from "../../processor/edgeTypes/ArduinoProcessor";
import { SequenceProcessor } from "../../processor/edgeTypes/SequenceProcessor";
import { IdentityProcessor } from "../../processor/IdentityProcessor";

// new edge (step 2): add a new edge definition here
export const edgeDefinitionUnknown: EdgeDefinition = {
    type: "unknown",
    animated: false,
    component: EdgeCreate,
    icon: WarningAmberIcon,
    edgePathStyle: "Smooth",
    immediate: false,
    priority: 0,
    processor: IdentityProcessor,
    requiresLabel: false,
    targetNodeTypes: [],
};

export const edgeDefinitionCreate: EdgeDefinition = {
    type: "create",
    animated: false,
    component: EdgeDefault,
    icon: AddIcon,
    edgePathStyle: "Smooth",
    immediate: false,
    priority: 1,
    processor: CreateProcessor,
    requiresLabel: false,
    targetNodeTypes: [],
    style: {
        strokeDasharray: "5"
    },
};

export const edgeDefinitionArduino: EdgeDefinition = {
    type: "arduino",
    animated: false,
    component: EdgeDefault,
    icon: DeveloperBoardIcon,
    edgePathStyle: "Smooth",
    immediate: false,
    priority: 9,
    processor: ArduinoProcessor,
    requiresLabel: false,
    targetNodeTypes: ["editor"]
};

export const edgeDefinitionExecute: EdgeDefinition = {
    type: "execute",
    animated: false,
    component: EdgeDefault,
    icon: DirectionsRunIcon,
    edgePathStyle: "Smooth",
    immediate: false,
    priority: 2,
    processor: ExecuteProcessor,
    requiresLabel: false,
    targetNodeTypes: ["editor"]
};

export const edgeDefinitionSequence: EdgeDefinition = {
    type: "sequence",
    animated: false,
    component: EdgeDefault,
    icon: KeyboardDoubleArrowRightIcon,
    edgePathStyle: "Smooth",
    immediate: false,
    priority: 8,
    processor: SequenceProcessor,
    requiresLabel: false,
    targetNodeTypes: ["editor"]
};

export const edgeDefinitionSCChartDiagram: EdgeDefinition = {
    type: "scchartdiagram",
    animated: true,
    component: EdgeDefault,
    icon: TableChartIcon,
    edgePathStyle: "Smooth",
    immediate: true,
    priority: 0,
    processor: SCChartDiagramProcessor,
    requiresLabel: false,
    targetNodeTypes: ["image"]
};

export const edgeDefinitionSCChartCode: EdgeDefinition = {
    type: "scchartcode",
    animated: false,
    component: EdgeDefault,
    edgePathStyle: "Smooth",
    icon: EngineeringIcon,
    immediate: false,
    priority: 3,
    processor: SCChartCodeProcessor,
    requiresLabel: false,
    targetNodeTypes: ["editor"]
};

export const edgeDefinitionTest: EdgeDefinition = {
    type: "test",
    animated: true,
    component: EdgeDefault,
    icon: BiotechIcon,
    edgePathStyle: "Smooth",
    immediate: true,
    priority: 0,
    processor: TestProcessor,
    requiresLabel: true,
    targetNodeTypes: ["editor"],
    transformationDirection: "dependency"
};

export const edgeDefinitionTranspile: EdgeDefinition = {
    type: "transpile",
    animated: true,
    component: EdgeDefault,
    icon: HardwareIcon,
    edgePathStyle: "Smooth",
    immediate: true,
    priority: 0,
    processor: TranspileProcessor,
    requiresLabel: false,
    targetNodeTypes: ["editor"],
    transformationDirection: "dependency"
};


// new edge (step 3): add the new edge definition to the following array
export const edgeDefinitions: EdgeDefinition[] = [
    edgeDefinitionCreate,
    edgeDefinitionArduino,
    edgeDefinitionExecute,
    edgeDefinitionSCChartCode,
    edgeDefinitionSCChartDiagram,
    edgeDefinitionSequence,
    edgeDefinitionTest,
    edgeDefinitionTranspile,
];

// new edge (step 4): add the edge type indicator as case to return new edge definition
export function retrieveEdgeDefinition(edgeTypeIndicator: EdgeTypeIndicator): EdgeDefinition {
    switch (edgeTypeIndicator) {
        case "unknown": 
            return edgeDefinitionUnknown;
        case "create":
            return edgeDefinitionCreate;
        case "arduino":
            return edgeDefinitionArduino;
        case "execute":
            return edgeDefinitionExecute;
        case "scchartdiagram":
            return edgeDefinitionSCChartDiagram;
        case "scchartcode":
            return edgeDefinitionSCChartCode;
        case "sequence":
            return edgeDefinitionSequence;
        case "test":
            return edgeDefinitionTest;
        case "transpile":
            return edgeDefinitionTranspile;
    }
}
