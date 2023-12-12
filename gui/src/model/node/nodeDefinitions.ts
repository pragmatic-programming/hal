import NodeCreate from "../../ui/flow/node/NodeCreate";
import NodeEditor from "../../ui/flow/node/NodeEditor";
import NodeImage from "../../ui/flow/node/NodeImage";
import { NodeDefinition } from "./NodeDefinition";
import { AttachFile, Image, InsertDriveFile } from "@mui/icons-material";
import NodeFile from "../../ui/flow/node/NodeFile";

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
        "arduino",
        "execute",
        "scchartcode",
        "sequence",
        "test",
        "transpile",
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

export const nodeDefinitionFile: NodeDefinition = {
    type: "file",
    icon: AttachFile,
    component: NodeFile,
    sourceEdgeTypes: [
        "sequence"
    ]
};

// new node (step 3): add the new node definition to the following array
export const nodeDefinitions: NodeDefinition[] = [
    nodeDefinitionCreate,
    nodeDefinitionEditor,
    nodeDefinitionFile,
    nodeDefinitionImage,
];
