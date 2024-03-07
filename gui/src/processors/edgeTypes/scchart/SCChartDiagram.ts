import { SimpleNode } from "@pragmatic-programming/ihgraph";

export class SCChartDiagram {
    private sourceNode: SimpleNode;

    constructor(sourceNode: SimpleNode) {
        this.sourceNode = sourceNode;
    }

    async diagram(): Promise<string> {
        const response: Response = await fetch(
            "http://localhost:8080/kico/diagram/",
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
        return URL.createObjectURL(await response.blob());
    }

    private async handleResponseNotOk(response: Response) {
        if (!response.ok) {
            throw new Error(await response.text());
        }
    }
}
