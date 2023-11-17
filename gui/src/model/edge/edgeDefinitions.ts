import { EdgeDefinition } from "./EdgeDefinition";
import EdgeCreate from "../../ui/flow/edge/EdgeCreate";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import BiotechIcon from "@mui/icons-material/Biotech";
import AddIcon from "@mui/icons-material/Add";
import TableChartIcon from "@mui/icons-material/TableChart";
import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import EdgeDefault from "../../ui/flow/edge/EdgeDefault";
import { ExecuteProcessor } from "../../processor/edgeTypes/execute/ExecuteProcessor";
import { SCChartDiagramProcessor } from "../../processor/edgeTypes/scchart/SCChartDiagramProcessor";
import { TestProcessor } from "../../processor/edgeTypes/TestProcessor";
import { CreateProcessor } from "../../processor/edgeTypes/CreateProcessor";
import { SCChartCodeProcessor } from "../../processor/edgeTypes/scchart/SCChartCodeProcessor";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { SequenceProcessor } from "hal-kico";

// new edge (step 2): add a new edge definition here
export const edgeDefinitionCreate: EdgeDefinition = {
    type: "create",
    animated: false,
    component: EdgeCreate,
    icon: AddIcon,
    immediate: false,
    priority: 1,
    processor: CreateProcessor,
    requiresLabel: false,
    targetNodeTypes: [],
    style: {
        strokeDasharray: "5"
    },
};

export const edgeDefinitionExecute: EdgeDefinition = {
    type: "execute",
    animated: false,
    component: EdgeDefault,
    icon: DirectionsRunIcon,
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
    icon: EngineeringIcon,
    immediate: false,
    priority: 3,
    processor: SCChartCodeProcessor,
    requiresLabel: false,
    targetNodeTypes: ["editor"]
};

export const edgeDefinitionWYTIWYG: EdgeDefinition = {
    type: "test",
    animated: true,
    component: EdgeDefault,
    icon: BiotechIcon,
    immediate: true,
    priority: 0,
    processor: TestProcessor,
    requiresLabel: true,
    targetNodeTypes: ["editor"],
    transformationDirection: "dependency"
};

// new edge (step 3): add the new edge definition to the following array
export const edgeDefinitions: EdgeDefinition[] = [
    edgeDefinitionCreate,
    edgeDefinitionExecute,
    edgeDefinitionSCChartCode,
    edgeDefinitionSCChartDiagram,
    edgeDefinitionSequence,
    edgeDefinitionWYTIWYG,
];

// new edge (step 4): add the edge type indicator as case to return new edge definition
export function retrieveEdgeDefinition(edgeTypeIndicator: EdgeTypeIndicator): EdgeDefinition {
    switch (edgeTypeIndicator) {
        case "create":
            return edgeDefinitionCreate;
        case "execute":
            return edgeDefinitionExecute;
        case "scchartdiagram":
            return edgeDefinitionSCChartDiagram;
        case "scchartcode":
            return edgeDefinitionSCChartCode;
        case "sequence":
            return edgeDefinitionSequence;
        case "test":
            return edgeDefinitionWYTIWYG;
    }
}