import {FlowToIHGraphProcessor} from "../../FlowToIHGraphProcessor";
import {SCChartCode} from "./SCChartCode";
import {IHGraph, SimpleNode, SimpleNodeStatus} from "@pragmatic-programming/ihgraph";
import {NodeDataFactory} from "../../../model/node/NodeDataFactory";
import { CliqueProcessor } from "../../directors/CliqueProcessor";

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
                NodeDataFactory.nodeDataEditor(
                    code,
                    "Generated Code",
                    "C",
                    SimpleNodeStatus.UNDEFINED,
                    undefined,
                    0,
                    0
                )
            );
            targetNode.setContent(code);
            this.setNewClique(targetGraph);
        } catch (e) {
            this.addError(String(e));
        }
    }

}
