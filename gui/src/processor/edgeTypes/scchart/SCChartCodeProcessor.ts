import { NodeDataEditor } from "../../../model/node/NodeData";
import { FlowToIHGraphProcessor } from "../../FlowToIHGraphProcessor";
import { SCChartCode } from "./SCChartCode";
import { IHGraph, SimpleNode, SimpleNodeStatus } from "ihgraph";
import { CliqueProcessor } from "../../CliqueProcessor";

export class SCChartCodeProcessor extends CliqueProcessor {

    getId() {
        return "hal.sccode";
    }

    getName() {
        return "SCCode";
    }

    isAsync() {
        return true;
    }

    async processAsync(): Promise<void> {
        const targetGraph: IHGraph = this.createTargetGraph();
        // todo why Sequence?
        const targetNode: SimpleNode = targetGraph.createSimpleNode("Sequence");
        const cliqueNodes: SimpleNode[] = this.getCliqueNodes();

        try {
            const scChartCode: SCChartCode = new SCChartCode(cliqueNodes[0]);
            const code: string = await scChartCode.code();
            targetNode.createAnnotation(
                FlowToIHGraphProcessor.ANNOTATION_NODE_DATA,
                this.nodeData(code)
            );
            targetNode.setContent(code);
            this.setNewClique(targetGraph);
        } catch (e) {
            this.addError(String(e));
        }
    }

    private nodeData(code: string): NodeDataEditor {
        // todo use NodeDataFactory
        return {
            content: code,
            language: "C",
            label: "Generated Code",
            type: "editor",
            status: SimpleNodeStatus.UNDEFINED,
            height: 0,
            width: 0,
        };
    }
}
