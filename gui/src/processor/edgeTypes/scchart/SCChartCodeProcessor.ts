import { NodeDataEditor } from "../../../model/node/NodeData";
import { FlowToIHGraphProcessor } from "../../FlowToIHGraphProcessor";
import { SCChartCode } from "./SCChartCode";
import { IHGraph, SourceNode, SourceNodeStatus } from "ihgraph";
import { CliqueProcessor } from "hal-kico";

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
        const targetNode: SourceNode = targetGraph.createSourceNode("Sequence");
        const cliqueNodes: SourceNode[] = this.getCliqueNodes();

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
            language: "C",
            label: "Generated Code",
            type: "editor",
            status: SourceNodeStatus.UNDEFINED,
        };
    }
}
