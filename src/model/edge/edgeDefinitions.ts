import EdgedStyled from "../../ui/flow/edge/EdgedStyled";
import { EdgeDefinition } from "./EdgeDefinition";

// new edge (step 2): add a new edge definition here
export const edgeDefinitions: EdgeDefinition[] = [
    {
        type: "execute",
        component: EdgedStyled
    },
    {
        type: "sequence",
        component: EdgedStyled
    },
    {
        type: "scchart",
        component: EdgedStyled
    }
];


