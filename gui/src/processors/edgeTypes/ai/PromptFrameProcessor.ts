import { SimpleNode } from "@pragmatic-programming/ihgraph";
import { CliqueProcessor } from "../../directors/CliqueProcessor";

export class PromptFrameProcessor extends CliqueProcessor {

    private static readonly PROMPTFRAME_EDGE_TYPE_ID = "promptframe";
    private static readonly PROMPT_NODE_ID = "Prompt";
    private static readonly PRECURSOR_NODE_ID = "Precursor";
    private static readonly REQUEST_NODE_ID = "Request";
    private static readonly RESPONSE_NODE_ID = "Response";
    private static readonly RESULT_NODE_ID = "Result";
    private static readonly KEY_NODE_ID = "Key";
    private static readonly API_ENDPOINT = "https://api.openai.com/v1/chat/completions"

    getId(): string {
        return "hal.ai.promptframe";
    }

    getName(): string {
        return "Prompt Frame";
    }

    isAsync(): boolean {
        return true;
    }

    async processAsync(): Promise<void> {
        const cliqueNodes: SimpleNode[] = this.getCliqueNodes();
        const promptNode = cliqueNodes.find(node => node.getId() === PromptFrameProcessor.PROMPT_NODE_ID);
        const precursorNode = cliqueNodes.find(node => node.getId() === PromptFrameProcessor.PRECURSOR_NODE_ID);
        const requestNode = cliqueNodes.find(node => node.getId() === PromptFrameProcessor.REQUEST_NODE_ID);
        const keyNode = cliqueNodes.find(node => node.getId() === PromptFrameProcessor.KEY_NODE_ID);
        const responseNode = cliqueNodes.find(node => node.getId() === PromptFrameProcessor.RESPONSE_NODE_ID);

        if (promptNode !== undefined && precursorNode !== undefined) {
            await this.processRequest(promptNode, precursorNode);
        } else if (requestNode !== undefined && keyNode !== undefined) {
            await this.processResponse(requestNode, keyNode);
        } else if (responseNode !== undefined) {
            await this.processResult(responseNode);
        } else {
            this.addError("The PromptFrame processor expects a prompt node named 'Prompt' and a precursor node named 'Precursor' and a key node named 'Key'.")
        }
    }

    public async processRequest(promptNode: SimpleNode, precursorNode: SimpleNode): Promise<void> {
        if (promptNode === undefined) {
            this.addError("The PromptFrame processor expects a prompt node named 'Prompt'.");
            return;
        }

        if (precursorNode === undefined) {
            this.addError("The PromptFrame processor expects a precursor node named 'Precursor'.");
            return;
        }

        const request = PromptFrameProcessor.getRequest(
            PromptFrameProcessor.format(precursorNode.getContentAsString()), 
            PromptFrameProcessor.format(promptNode.getContentAsString())
        );

        const newClique = this.getNextClique().clone();
        newClique.removeNodeById(PromptFrameProcessor.PROMPT_NODE_ID);
        newClique.removeNodeById(PromptFrameProcessor.PRECURSOR_NODE_ID);
        const requestNode = newClique.createSimpleNode(PromptFrameProcessor.REQUEST_NODE_ID);
        requestNode.setContent(request);

        const resultNode = newClique.getNodeById(PromptFrameProcessor.RESULT_NODE_ID);
        if (resultNode !== undefined) {
            newClique.createTransformationEdge(newClique.getEdgeTypeById(PromptFrameProcessor.PROMPTFRAME_EDGE_TYPE_ID)!, requestNode, resultNode);
        }

        this.setNewClique(newClique);
        console.log(newClique.toStringDebugGraph());
    }

    public async processResponse(requestNode: SimpleNode, keyNode: SimpleNode): Promise<void> {
        if (requestNode === undefined || requestNode.getContentAsString() === "") {
            this.addError("The request node does not hold any content.");
            return;
        }

        if (keyNode === undefined || keyNode.getContentAsString() === "") {
            this.addError("You must provide a request key.");
            return;
        }

        let responseContent: string = "";

        if (keyNode.getContentAsString() === "debug") {
            responseContent = PromptFrameProcessor.getDebugResponse();
        } else {
            const response = await fetch(PromptFrameProcessor.API_ENDPOINT, {
                method: 'POST',
                body: requestNode.getContentAsString(),
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": "Bearer " + keyNode.getContentAsString()
                } });
                
            if (response === undefined || !response.ok || response.body === undefined || response.body === null) { 
                this.addError("The request to the OpenAI API failed.");
                return;
            }

            const responseBody = await response.body?.getReader().read();
            responseContent = new TextDecoder("utf-8").decode(responseBody?.value);
        }

        const graph = this.getNextClique().clone();

        const resultGraph = graph.clone().clear();
        const resultNode = resultGraph.createSimpleNode(PromptFrameProcessor.RESULT_NODE_ID);
        const responseNode = resultGraph.createSimpleNode(PromptFrameProcessor.RESPONSE_NODE_ID);
        resultGraph.createTransformationEdge(resultGraph.getEdgeTypeById(PromptFrameProcessor.PROMPTFRAME_EDGE_TYPE_ID)!, responseNode, resultNode);

        responseNode.setContent(responseContent);
        resultNode.setContent("");
        this.setNewClique(resultGraph);
        console.log(resultGraph.toStringDebugGraph());
    }

    public async processResult(responseNode: SimpleNode): Promise<void> {
        const graph = this.getNextClique().clone();
        const resultNode = graph.getNodeById(PromptFrameProcessor.RESULT_NODE_ID) as SimpleNode;

        if (resultNode === undefined) {
            this.addError("The PromptFrame processor expects a result node named 'Result'.");
            return;
        }

        const response = responseNode.getContentAsString() 
        const responseJSON = JSON.parse(response);

        if (responseJSON.choices === undefined || responseJSON.choices.length === 0) {
            this.addError("The response does not contain any solutions.");
            return;
        }

        if (responseJSON.choices[0].message === undefined || responseJSON.choices[0].message.content === undefined) {
            this.addError("The response does not contain any content.");
            return;
        }

        const scchart = PromptFrameProcessor.extractSCChart(responseJSON.choices[0].message.content)
        resultNode.setContent(scchart);
        graph.removeNodeById(PromptFrameProcessor.RESPONSE_NODE_ID);
        this.setNewClique(graph);
    }

    protected static format(s: string): string {
        return s.replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "");
    }

    protected static extractSCChart(s: string): string {
        let result = "";
        let inSCChart = false;
        const lines = s.split("\n");

        for (const line of lines) {
            if (line.includes("```scchart")) {
                inSCChart = true;
            } else if (line.includes("```")) {
                inSCChart = false;
            } else {
                if (inSCChart) {
                  result += line + "\n";
                }
            }
        }

        return result;
    }

    protected static getRequest(system: string, prompt: string): string {
        return `{
"model": "gpt-4",
"messages": [
    {
    "role": "system",
    "content": "${system}"
    },
    {
    "role": "user",
    "content": "${prompt}"
    }
],
"temperature": 0,
"max_tokens": 1024,
"top_p": 1,
"frequency_penalty": 0,
"presence_penalty": 0,
"seed": 0
}`;
    };

    protected static getDebugResponse(): string {
        return `{
"id": "debug",
"object": "chat.completion",
"created": 1706000000,
"model": "gpt-4",
"choices": [
    {
    "index": 0,
    "message": {
        "role": "assistant",
        "content": "Sure, here is an example of an SCChart that transitions between three states: red, green, and blue every 3 seconds.\\n\\n\`\`\`scchart\\nscchart RGB {\\n  input bool tick\\n  int counter = 0\\n\\n  initial state red {\\n    entry do counter = 0\\n    }\\n  if 3 tick do counter = counter + 1 go to green\\n\\n  state green {\\n    entry do counter = 0\\n    }\\n  if 3 tick do counter = counter + 1 go to blue\\n\\n  final state blue {\\n    entry do counter = 0\\n    }\\n  if 3 tick do counter = counter + 1 go to red\\n  }\\n\`\`\`\\n\\nIn this SCChart, the \`tick\` input is used to count the seconds. The \`counter\` variable is incremented every tick and when it reaches 3, the transition to the next state is triggered. The \`entry do\` action resets the counter each time a state is entered. The \`final\` keyword in the \`blue\` state is optional and doesn't affect the behavior of the chart in this case."
    },
    "logprobs": null,
    "finish_reason": "stop"
    }
],
"usage": {
    "prompt_tokens": 682,
    "completion_tokens": 226,
    "total_tokens": 908
},
"system_fingerprint": null
}`;
    }
}
