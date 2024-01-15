import { SourceNode } from "ihgraph";
import { SourceNodeContent } from "../../../../../ihgraph";

export class IndentedString {

    private value: string;

    constructor(value: string) {
        this.value = value;
    }

    static fromSourceNode(sourceNode: SourceNode): IndentedString {
        const content: SourceNodeContent = sourceNode.getContent();
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
