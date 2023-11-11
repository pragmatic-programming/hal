import { EdgeDefinition } from "./EdgeDefinition";
import EdgeCreate from "../../ui/flow/edge/EdgeCreate";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import BiotechIcon from "@mui/icons-material/Biotech";
import AddIcon from "@mui/icons-material/Add";
import TableChartIcon from "@mui/icons-material/TableChart";
import { EdgeTypeIndicator } from "./EdgeTypeIndicator";
import EdgeDefault from "../../ui/flow/edge/EdgeDefault";

// new edge (step 2): add a new edge definition here
export const edgeDefinitionCreate: EdgeDefinition = {
    type: "create",
    component: EdgeCreate,
    animated: true,
    icon: AddIcon,
};

export const edgeDefinitionExecute: EdgeDefinition = {
    type: "execute",
    component: EdgeDefault,
    animated: true,
    icon: DirectionsRunIcon,
};

export const edgeDefinitionSequence: EdgeDefinition = {
    type: "sequence",
    component: EdgeDefault,
    animated: false,
    icon: KeyboardDoubleArrowRightIcon,
    style: {
        stroke: "green"
    }
};

export const edgeDefinitionSSChart: EdgeDefinition = {
    type: "scchart",
    component: EdgeDefault,
    animated: true,
    icon: TableChartIcon,
    style: {
        stroke: "blue"
    }
};

export const edgeDefinitionWYTIWYG: EdgeDefinition = {
    type: "wytiwyg",
    component: EdgeDefault,
    icon: BiotechIcon,
    animated: true
};

// new edge (step 3): add the new edge definition to the following array
export const edgeDefinitions: EdgeDefinition[] = [
    edgeDefinitionCreate,
    edgeDefinitionExecute,
    edgeDefinitionSSChart,
    edgeDefinitionSequence,
    edgeDefinitionWYTIWYG,
];

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
