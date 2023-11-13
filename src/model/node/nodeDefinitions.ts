import NodeCreate from "../../ui/flow/node/NodeCreate";
import NodeEditor from "../../ui/flow/node/NodeEditor";
import NodeImage from "../../ui/flow/node/NodeImage";
import { NodeDefinition } from "./NodeDefinition";
import { Image, InsertDriveFile } from "@mui/icons-material";

// new node (step 2): add a new node definition here
export const nodeDefinitionCreate: NodeDefinition = {
    type: "create",
    icon: InsertDriveFile,
    component: NodeCreate,
    sourceEdgeTypes: []
};

export const nodeDefinitionEditor: NodeDefinition = {
    type: "editor",
    icon: InsertDriveFile,
    component: NodeEditor,
    sourceEdgeTypes: [
        "execute",
        "scchartcode",
        "sequence",
        "sequence",
        "test",
    ]
};

export const nodeDefinitionImage: NodeDefinition = {
    type: "image",
    icon: Image,
    component: NodeImage,
    sourceEdgeTypes: [
        "scchartdiagram"
    ]
};

// new node (step 3): add the new node definition to the following array
export const nodeDefinitions: NodeDefinition[] = [
    nodeDefinitionCreate,
    nodeDefinitionEditor,
    nodeDefinitionImage,
];
