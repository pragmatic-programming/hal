import { CliqueProcessor } from "./CliqueProcessor";
import { SourceNodeContent } from "../../../../ihgraph/src";
import { SourceNode } from "../../../../ihgraph";

export class EvalProcessor extends CliqueProcessor {

    process() {
        const sources = this.getSourceNodes();
        const targets = this.getTargetNodes();

        sources.forEach((sourceNode: SourceNode): void => {
            const content: SourceNodeContent = sourceNode.getContent();
            if (content === undefined) {
                throw new Error("Content is undefined");
            }
            // eslint-disable-next-line no-eval
            const result: string = eval(content);
            targets.forEach((target: SourceNode) => target.appendContent(result));
        });

        const targetGraph = this.createTargetGraph();
        targets.forEach((target, i) => targetGraph.createSourceNode("Eval" + i).setContent(target.getContent()));
        this.setNewClique(targetGraph);
    }

    getId() {
        return "EvalProcessor";
    }

    getName() {
        return "Eval Processor";
    }
}
