import { SimpleNode } from "@pragmatic-programming/ihgraph";
import { ExecutionInterface } from "./ExecutionInterface";

export class RemoteExecution implements ExecutionInterface {
    private sourceNode: SimpleNode;

    constructor(sourceNode: SimpleNode) {
        this.sourceNode = sourceNode;
    }

    async text(): Promise<string> {
        const response: Response = await fetch(
            "http://localhost:8080/execute/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    language: "Python",
                    payload: this.sourceNode.getContent(),
                })
            }
        );
        await this.handleResponseNotOk(response);
        return await response.text();
    }

    private async handleResponseNotOk(response: Response) {
        if (!response.ok) {
            throw new Error(await response.text());
        }
    }
}
