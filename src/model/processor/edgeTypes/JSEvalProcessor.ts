import { EvalProcessor } from "hal-kico";
import { FlowToIHGraphProcessor } from "../FlowToIHGraphProcessor";
import NodeData from "../../NodeData";

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
            height: 100,
            label: "Eval",
            language: "JavaScript",
            type: "editor",
            width: 100,
        };
        node.createAnnotation(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA, nodeData);
    }

}
