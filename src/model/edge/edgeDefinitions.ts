import { EdgeDefinition } from "./EdgeDefinition";
import EdgeCreate from "../../ui/flow/edge/EdgeCreate";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import BiotechIcon from "@mui/icons-material/Biotech";
import AddIcon from "@mui/icons-material/Add";
import TableChartIcon from "@mui/icons-material/TableChart";
import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import EdgeDefault from "../../ui/flow/edge/EdgeDefault";
import { JSEvalProcessor } from "../processor/edgeTypes/JSEvalProcessor";
import { SCChartProcessor } from "../processor/edgeTypes/SCChartProcessor";
import { SequenceProcessor } from "hal-kico";
import { WYTIWYGProcessor } from "../processor/edgeTypes/WYTIWYGProcessor";
import { CreateProcessor } from "../processor/edgeTypes/CreateProcessor";

// new edge (step 2): add a new edge definition here
export const edgeDefinitionCreate: EdgeDefinition = {
    type: "create",
    animated: true,
    component: EdgeCreate,
    icon: AddIcon,
    immediate: false,
    priority: 0,
    processor: CreateProcessor,
};

export const edgeDefinitionExecute: EdgeDefinition = {
    type: "execute",
    animated: true,
    component: EdgeDefault,
    icon: DirectionsRunIcon,
    immediate: false,
    priority: 2,
    processor: JSEvalProcessor,
};

export const edgeDefinitionSequence: EdgeDefinition = {
    type: "sequence",
    animated: false,
    component: EdgeDefault,
    icon: KeyboardDoubleArrowRightIcon,
    immediate: false,
    priority: 8,
    processor: SequenceProcessor,
    style: {stroke: "green"}
};

export const edgeDefinitionSSChart: EdgeDefinition = {
    type: "scchart",
    animated: true,
    component: EdgeDefault,
    icon: TableChartIcon,
    immediate: false,
    priority: 3,
    processor: SCChartProcessor,
    style: {stroke: "blue"},
};

export const edgeDefinitionWYTIWYG: EdgeDefinition = {
    type: "wytiwyg",
    animated: true,
    component: EdgeDefault,
    icon: BiotechIcon,
    immediate: true,
    priority: 0,
    processor: WYTIWYGProcessor,
};

// new edge (step 3): add the new edge definition to the following array
export const edgeDefinitions: EdgeDefinition[] = [
    edgeDefinitionCreate,
    edgeDefinitionExecute,
    edgeDefinitionSSChart,
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
        case "scchart":
            return edgeDefinitionSSChart;
        case "sequence":
            return edgeDefinitionSequence;
        case "wytiwyg":
            return edgeDefinitionWYTIWYG;
    }
}
