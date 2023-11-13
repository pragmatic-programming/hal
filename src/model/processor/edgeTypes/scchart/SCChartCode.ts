import { SourceNode } from "ihgraph";

export class SCChartCode {
    private sourceNode: SourceNode;

    constructor(sourceNode: SourceNode) {
        this.sourceNode = sourceNode;
    }

    async code(): Promise<string> {
        const response: Response = await fetch(
            "http://localhost:8080/kico/code/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    payload: this.sourceNode.getContent()
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
