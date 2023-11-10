import { CliqueProcessor, EvalProcessor } from "hal-kico";
import { FlowToIHGraphProcessor } from "../FlowToIHGraphProcessor";
import { NodeData } from "../../node/NodeData";
import { SourceNodeStatus } from "ihgraph";

export class WYTIWYGProcessor extends CliqueProcessor {

    getId() {
        return "hal.js.wytiwyg";
    }

    getName() {
        return "WYTIWYG";
    }

    process() {
        const cliqueNodes = this.getCliqueNodes();

        const unit = cliqueNodes.slice(-1)[0].getContent();

        for (let i = 0; i < cliqueNodes.length - 1; i++) {
            const node = cliqueNodes[i];
            const test = node.getContent();

            const content = unit + "\n\n" + test;

            const result: string = eval(content);
            console.log(result);

            if (result === "false") {
                // const node = this.getModel().getSourceNodes()[0];
                // const nodeData: NodeData = {
                //     content: node.getContent(),
                //     height: 100,
                //     label: "Eval",
                //     language: "JavaScript",
                //     type: "editor",
                //     width: 100,
                // };
                // node.createAnnotation(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA, nodeData);
                node.setStatus(SourceNodeStatus.ERROR);
            }
        };

    }

}
