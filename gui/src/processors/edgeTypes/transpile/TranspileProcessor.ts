import { RemoteTranspilation } from "./RemoteTranspilation";
import { NodeData } from "../../../model/node/NodeData";
import { SimpleNode, SimpleNodeContent } from "@pragmatic-programming/ihgraph";
import { CliqueProcessor } from "../../directors/CliqueProcessor";


export class TranspileProcessor extends CliqueProcessor {

    getId() {
        return "hal.transpile";
    }

    getName() {
        return "Transpile";
    }

    isAsync() {
        return true;
    }

    async processAsync(): Promise<void> {
        const cliqueNodes: SimpleNode[] = this.getCliqueNodes();
        for (let i = 0; i < cliqueNodes.length - 1; i++) {
            const sourceNode = cliqueNodes[i];
            const targetNode = cliqueNodes[i + 1];
            const sourceNodeNodeData: NodeData = sourceNode.getAnnotationData<NodeData>("nodeData");
            const targetNodeNodeData: NodeData = targetNode.getAnnotationData<NodeData>("nodeData");
            const content: SimpleNodeContent = sourceNode.getContent();
            if (sourceNodeNodeData.type !== "editor") {
                throw new Error("SourceNode is not from type editor");
            }
            if (targetNodeNodeData.type !== "editor") {
                throw new Error("TargetNode is not from type editor");
            }
            if (content === undefined) {
                throw new Error("Content is undefined");
            }
            const remoteTranspilation = new RemoteTranspilation(
                sourceNodeNodeData.language,
                targetNodeNodeData.language,
                content
            );
            targetNode.setContent(await remoteTranspilation.text());
        }
    }


}
