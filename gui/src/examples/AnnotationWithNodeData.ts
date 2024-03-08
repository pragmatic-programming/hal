import { NodeData } from "../model/node/NodeData";

export interface AnnotationWithNodeData<T extends NodeData> {
    nodeData: {
        id: "nodeData",
        data: T,
    };
}
