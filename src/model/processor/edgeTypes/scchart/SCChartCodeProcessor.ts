import { CliqueProcessor } from "hal-kico";
import { NodeDataEditor } from "../../../node/NodeData";
import { FlowToIHGraphProcessor } from "../../FlowToIHGraphProcessor";
import { SCChartCode } from "./SCChartCode";
import { SourceNodeStatus } from "ihgraph";

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
        const targetGraph = this.createTargetGraph();
        // todo why Sequence?
        const targetNode = targetGraph.createSourceNode("Sequence");
        const cliqueNodes = this.getCliqueNodes();

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
        return {
            content: code,
            height: 300,
            language: "C",
            label: "Generated Code",
            type: "editor",
            width: 200,
            status: SourceNodeStatus.UNDEFINED,
        };
    }
}
