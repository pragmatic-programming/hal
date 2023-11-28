import { SourceNode } from "ihgraph";

export class IndentedString {

    private value: string;

    constructor(value: string) {
        this.value = value;
    }

    static fromSourceNode(sourceNode: SourceNode): IndentedString {
        return new IndentedString(sourceNode.getContent());
    }

    indented(): string {
        return this.value
            .split("\n")
            .map(line => ` ${line}`)
            .join("\n");
    }

}
