import { CliqueProcessor } from "../directors/CliqueProcessor";
import { SimpleNode, SimpleNodeContent } from "@pragmatic-programming/ihgraph";

export class EvalProcessor extends CliqueProcessor {

    process() {
        const sources = this.getSourceNodes();
        const targets = this.getTargetNodes();

        sources.forEach((sourceNode: SimpleNode): void => {
            const content: SimpleNodeContent = sourceNode.getContent();
            if (content === undefined) {
                throw new Error("Content is undefined");
            }
            // eslint-disable-next-line no-eval
            const result: string = eval(content);
            targets.forEach((target: SimpleNode) => target.appendContent(result));
        });

        const targetGraph = this.createTargetGraph();
        targets.forEach((target, i) => targetGraph.createSimpleNode("Eval" + i).setContent(target.getContent()));
        this.setNewClique(targetGraph);
    }

    getId() {
        return "EvalProcessor";
    }

    getName() {
        return "Eval Processor";
    }
}
