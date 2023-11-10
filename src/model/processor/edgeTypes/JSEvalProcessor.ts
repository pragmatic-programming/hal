import { EvalProcessor } from "hal-kico";
import { FlowToIHGraphProcessor } from "../FlowToIHGraphProcessor";
import { NodeData } from "../../node/NodeData";
import { SourceNodeStatus } from "ihgraph";

export class JSEvalProcessor extends EvalProcessor {

    getId() {
        return "hal.js.eval";
    }

    getName() {
        return "JS Eval";
    }

    process(): void {
        super.process();
        const node = this.getModel().getSourceNodes()[0];
        const nodeData: NodeData = {
            content: node.getContent(),
            height: 200,
            label: "Eval",
            language: "JavaScript",
            type: "editor",
            width: 200,
            status: SourceNodeStatus.UNDEFINED,
        };
        node.createAnnotation(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA, nodeData);
    }

}
