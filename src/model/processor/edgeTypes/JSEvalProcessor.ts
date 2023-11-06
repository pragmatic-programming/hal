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
            label: "Eval",
            language: "JavaScript",
            content: node.getContent()
        }
        node.createAnnotation(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA, nodeData);
    }
    
}