import { SimpleNode, SimpleNodeContent } from "@pragmatic-programming/ihgraph";

export class IndentedString {

    private value: string;

    constructor(value: string) {
        this.value = value;
    }

    static fromSourceNode(sourceNode: SimpleNode): IndentedString {
        const content: SimpleNodeContent = sourceNode.getContent();
        if (content === undefined) {
            throw new Error("Content is undefined");
        }
        return new IndentedString(content);
    }

    indented(): string {
        return this.value
            .split("\n")
            .map(line => ` ${line}`)
            .join("\n");
    }

}
