import { SourceNode } from "ihgraph";
import { ExecutionInterface } from "./ExecutionInterface";

export class RemoteExecution implements ExecutionInterface {
    private sourceNode: SourceNode;

    constructor(sourceNode: SourceNode) {
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
                    image: "python:3.6",
                    payload: this.sourceNode.getContent(),
                })
            }
        );
        await this.handleResponseNotOk(response);
        const body = await response.json();
        return body["payload"];
    }

    private async handleResponseNotOk(response: Response) {
        if (!response.ok) {
            throw new Error(await response.text());
        }
    }
}