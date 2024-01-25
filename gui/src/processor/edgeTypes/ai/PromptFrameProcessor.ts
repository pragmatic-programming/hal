import { IHGraph, SimpleNode, SimpleNodeStatus } from "@pragmatic-programming/ihgraph";
import { NodeData } from "../../../model/node/NodeData";
import { FlowToIHGraphProcessor } from "../../FlowToIHGraphProcessor";
import { IndentedString } from "../IndentedString";
import { ArduinoSetupLoop } from "../ArduinoSetupLoop";
import { NodeDataFactory } from "../../../model/node/NodeDataFactory";
import { CliqueProcessor } from "../../CliqueProcessor";

export class PromptFrameProcessor extends CliqueProcessor {

    private static readonly PROMPT_NODE_ID = "Prompt";
    private static readonly PRECURSOR_NODE_ID = "Precursor";
    private static readonly REQUEST_NODE_ID = "Request";

    getId(): string {
        return "hal.ai.promptFrame";
    }

    getName(): string {
        return "Prompt Frame";
    }

    public process(): void {
        const cliqueNodes: SimpleNode[] = this.getCliqueNodes();
        const promptNode = cliqueNodes.find(node => node.getId() === PromptFrameProcessor.PROMPT_NODE_ID);
        const precursorNode = cliqueNodes.find(node => node.getId() === PromptFrameProcessor.PRECURSOR_NODE_ID);
        const requestNode = cliqueNodes.find(node => node.getId() === PromptFrameProcessor.REQUEST_NODE_ID);

        console.log("PromptFrame processor running.");

        if (promptNode === undefined) {
            this.addError("The PromptFrame processor expects a prompt node named 'Prompt'.");
            return;
        }
        if (precursorNode === undefined) {
            this.addError("The PromptFrame processor expects a precursor node named 'Precursor'.");
            return;
        }
        if (requestNode === undefined) {
            this.addError("The PromptFrame processor expects a request node named 'Key'.");
            return;
        } 

        const request = 
        `{
            "model": "gpt-4",
            "messages": [
              {
                "role": "system",
                "content": "${this.format(precursorNode.getContentAsString())}"
              },
              {
                "role": "user",
                "content": "${this.format(promptNode.getContentAsString())}"
              }
            ],
            "temperature": 0,
            "max_tokens": 1024,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "seed": 0
        }`

        const newClique = this.createTargetGraph();
        const sourceNode = newClique.createSimpleNode("Request");
        sourceNode.setContent(request);
        sourceNode.cloneAnnotationsTo(sourceNode);
        this.setNewClique(newClique);
    }

    protected format(s: string): string{
        return s.replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "");
    }
}
