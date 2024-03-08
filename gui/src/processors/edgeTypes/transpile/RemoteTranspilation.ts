import { ExecutionInterface } from "../execute/ExecutionInterface";

export class RemoteTranspilation implements ExecutionInterface {
    private readonly inputLanguage: string;
    private readonly outputLanguage: string;
    private readonly payload: string;

    constructor(inputLanguage: string, outputLanguage: string, payload: string) {
        this.inputLanguage = inputLanguage;
        this.outputLanguage = outputLanguage;
        this.payload = payload;
    }

    async text(): Promise<string> {
        const response: Response = await fetch(
            "http://localhost:8080/transpile/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputLanguage: this.inputLanguage,
                    outputLanguage: this.outputLanguage,
                    payload: this.payload,
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
