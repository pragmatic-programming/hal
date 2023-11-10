
import { EdgeDefinition } from "./EdgeDefinition";
import EdgeExecute from "../../ui/flow/edge/EdgeExecute";
import EdgedSequence from "../../ui/flow/edge/EdgeSequence";
import EdgeSCChart from "../../ui/flow/edge/EdgeSCChart";
import EdgeWYTIWYG from "../../ui/flow/edge/EdgeWYTIWYG";

// new edge (step 2): add a new edge definition here
export const edgeDefinitionExecute: EdgeDefinition = {
    type: "execute",
    component: EdgeExecute,
    animated: true,
};
export const edgeDefinitionSequence: EdgeDefinition = {
    type: "sequence",
    component: EdgedSequence,
    animated: false,
    style: {
        stroke: "green"
    }
};
export const edgeDefinitionSSChart: EdgeDefinition = {
    type: "scchart",
    component: EdgeSCChart,
    animated: true,
    style: {
        stroke: "blue"
    }
};
export const edgeDefinitionWYTIWYG: EdgeDefinition = {
    type: "wytiwyg",
    component: EdgeWYTIWYG,
    animated: true
}

// new edge (step 3): add the new edge definition to the following array
export const edgeDefinitions: EdgeDefinition[] = [
    edgeDefinitionExecute,
    edgeDefinitionSequence,
    edgeDefinitionSSChart,
    edgeDefinitionWYTIWYG
];


