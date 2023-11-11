import { EdgeDefinition } from "./EdgeDefinition";
import EdgeExecute from "../../ui/flow/edge/EdgeExecute";
import EdgedSequence from "../../ui/flow/edge/EdgeSequence";
import EdgeSCChart from "../../ui/flow/edge/EdgeSCChart";
import EdgeWYTIWYG from "../../ui/flow/edge/EdgeWYTIWYG";
import EdgeCreate from "../../ui/flow/edge/EdgeCreate";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import BiotechIcon from '@mui/icons-material/Biotech';
import AddIcon from '@mui/icons-material/Add';
import TableChartIcon from '@mui/icons-material/TableChart';

// new edge (step 2): add a new edge definition here
export const edgeDefinitionCreate: EdgeDefinition = {
    type: "create",
    component: EdgeCreate,
    animated: true,
    icon: AddIcon,
};

export const edgeDefinitionExecute: EdgeDefinition = {
    type: "execute",
    component: EdgeExecute,
    animated: true,
    icon: DirectionsRunIcon,
};

export const edgeDefinitionSequence: EdgeDefinition = {
    type: "sequence",
    component: EdgedSequence,
    animated: false,
    icon: KeyboardDoubleArrowRightIcon,
    style: {
        stroke: "green"
    }
};

export const edgeDefinitionSSChart: EdgeDefinition = {
    type: "scchart",
    component: EdgeSCChart,
    animated: true,
    icon: TableChartIcon,
    style: {
        stroke: "blue"
    }
};

export const edgeDefinitionWYTIWYG: EdgeDefinition = {
    type: "wytiwyg",
    component: EdgeWYTIWYG,
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


