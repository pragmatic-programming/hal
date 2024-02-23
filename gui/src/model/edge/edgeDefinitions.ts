import { EdgeDefinition } from "./EdgeDefinition";
import EdgeCreate from "../../ui/flow/edge/EdgeCreate";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import BiotechIcon from "@mui/icons-material/Biotech";
import AddIcon from "@mui/icons-material/Add";
import HardwareIcon from "@mui/icons-material/Hardware";
import TableChartIcon from "@mui/icons-material/TableChart";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
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
import { UnknownProcessor } from "../../processor/edgeTypes/UnknownProcessor";
import { IdentityProcessor } from "../../processor/IdentityProcessor";

// new edge (step 2): add a new edge definition here
export const edgeDefinitionUnknown: EdgeDefinition = {
    type: "unknown",
    animated: false,
    component: EdgeDefault,
    icon: QuestionMarkIcon,
    edgePathStyle: "Smooth",
    immediate: false,
    priority: 0,
    processor: UnknownProcessor,
    targetNodeTypes: [],
};

export const edgeDefinitionPrototype: EdgeDefinition = {
    type: "prototype",
    animated: false,
    component: EdgeDefault,
    icon: WarningAmberIcon,
    edgePathStyle: "Bezier",
    immediate: false,
    priority: 0,
    processor: IdentityProcessor,
    targetNodeTypes: [],
};

export const edgeDefinitionCreate: EdgeDefinition = {
    type: "create",
    animated: false,
    component: EdgeCreate,
    icon: AddIcon,
    edgePathStyle: "Smooth",
    immediate: false,
    priority: 1,
    processor: CreateProcessor,
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
    priority: 1,
    processor: TranspileProcessor,
    targetNodeTypes: ["editor"],
    transformationDirection: "dependency"
};


// new edge (step 3): add the new edge definition to the following array
export const defaultEdgeDefinitions: { [ key: string ]: EdgeDefinition } = {
    // default edges
    edgeDefinitionUnknown,
    prototype: edgeDefinitionPrototype,
    // custom edges
    create: edgeDefinitionCreate,
    arduino: edgeDefinitionArduino,
    execute: edgeDefinitionExecute,
    scchartcode: edgeDefinitionSCChartCode,
    scchartdiagram: edgeDefinitionSCChartDiagram,
    sequence: edgeDefinitionSequence,
    test: edgeDefinitionTest,
    transpile: edgeDefinitionTranspile,
};

// new edge (step 4): add the edge type indicator as case to return new edge definition
export function retrieveEdgeDefinition(edgeTypeIndicator: string): EdgeDefinition {
    switch (edgeTypeIndicator) {
        // default edges
        case "unknown":
            return edgeDefinitionUnknown;
        case "create":
            return edgeDefinitionCreate;
        // custom edges
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
    return edgeDefinitionPrototype;
}
