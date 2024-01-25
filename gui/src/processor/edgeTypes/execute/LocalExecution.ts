import { SimpleNode, SimpleNodeContent } from "@pragmatic-programming/ihgraph";
import { ExecutionInterface } from "./ExecutionInterface";

export class LocalExecution implements ExecutionInterface {
    private sourceNode: SimpleNode;

    constructor(sourceNode: SimpleNode) {
        this.sourceNode = sourceNode;
    }

    async text(): Promise<string> {
        const content: SimpleNodeContent = this.sourceNode.getContent();
        if (content === undefined) {
            throw new Error("Content is undefined");
        }
        // eslint-disable-next-line no-eval
        return Promise.resolve(eval(content));
    }

}
