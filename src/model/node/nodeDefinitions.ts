import NodeCreation from "../../ui/flow/node/NodeCreation";
import NodeEditor from "../../ui/flow/node/NodeEditor";
import NodeResult from "../../ui/flow/node/NodeResult";
import NodeImage from "../../ui/flow/node/NodeImage";
import { NodeDefinition } from "./NodeDefinition";

// new node (step 2): add a new node definition here
export const nodeDefinitions: NodeDefinition[] = [
    {
        type: "creation",
        component: NodeCreation
    },
    {
        type: "editor",
        component: NodeEditor
    },
    {
        type: "result",
        component: NodeResult
    },
    {
        type: "image",
        component: NodeImage
    }
];
