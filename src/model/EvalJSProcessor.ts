import { Processor } from "kico";
import { IHGraph, SourceNode } from "ihgraph";

export class EvalJSProcessor extends Processor<IHGraph, string> {

    process() {
        const model = this.getModel();
        let sourceNodes: SourceNode[] = model.getSourceNodes();
        if (sourceNodes.length > 2) {
            throw new Error("IHGraph is not fully compiled");
        }
        // eslint-disable-next-line no-eval
        const result: string = eval(sourceNodes[0].getContent());
        this.setModel(result);
    }

    getId() {
        return "hal.projecttoihgraphprocessor";
    }

    getName() {
        return "ProjectToIHGraphProcessor";
    }
}
