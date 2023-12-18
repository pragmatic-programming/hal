import { CliqueProcessor } from "./CliqueProcessor";

export class EvalProcessor extends CliqueProcessor {

    process() {
        const sources = this.getSourceNodes();
        const targets = this.getTargetNodes();

        sources.forEach(source => {
            // eslint-disable-next-line no-eval
            const result: string = eval(source.getContent());
            targets.forEach(target => target.appendContent(result));
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
