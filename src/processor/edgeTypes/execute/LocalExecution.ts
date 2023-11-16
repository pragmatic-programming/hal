import { SourceNode } from "ihgraph";
import { ExecutionInterface } from "./ExecutionInterface";

export class LocalExecution implements ExecutionInterface {
    private sourceNode: SourceNode;

    constructor(sourceNode: SourceNode) {
        this.sourceNode = sourceNode;
    }

    async text(): Promise<string> {
        // eslint-disable-next-line no-eval
        return Promise.resolve(eval(this.sourceNode.getContent()))
    }

}
