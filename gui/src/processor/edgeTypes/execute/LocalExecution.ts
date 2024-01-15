import { SourceNode } from "ihgraph";
import { ExecutionInterface } from "./ExecutionInterface";
import { SourceNodeContent } from "../../../../../../ihgraph";

export class LocalExecution implements ExecutionInterface {
    private sourceNode: SourceNode;

    constructor(sourceNode: SourceNode) {
        this.sourceNode = sourceNode;
    }

    async text(): Promise<string> {
        const content: SourceNodeContent = this.sourceNode.getContent();
        if (content === undefined) {
            throw new Error("Content is undefined");
        }
        // eslint-disable-next-line no-eval
        return Promise.resolve(eval(content));
    }

}
