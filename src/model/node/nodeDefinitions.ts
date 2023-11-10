import NodeCreation from "../../ui/flow/node/NodeCreation";
import NodeEditor from "../../ui/flow/node/NodeEditor";
import NodeResult from "../../ui/flow/node/NodeResult";
import NodeImage from "../../ui/flow/node/NodeImage";
import { NodeDefinition } from "./NodeDefinition";
import { Done, Image, InsertDriveFile } from "@mui/icons-material";

// new node (step 2): add a new node definition here
export const nodeDefinitions: NodeDefinition[] = [
    {
        type: "creation",
        icon: InsertDriveFile,
        component: NodeCreation,
    },
    {
        type: "editor",
        icon: InsertDriveFile,
        component: NodeEditor
    },
    {
        type: "result",
        icon: Done,
        component: NodeResult
    },
    {
        type: "image",
        icon: Image,
        component: NodeImage
    }
];
