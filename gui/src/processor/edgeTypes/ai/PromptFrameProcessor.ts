import { IHGraph, SourceNode, SourceNodeStatus } from "ihgraph";
import { NodeData } from "../../../model/node/NodeData";
import { FlowToIHGraphProcessor } from "../../FlowToIHGraphProcessor";
import { IndentedString } from "../IndentedString";
import { ArduinoSetupLoop } from "../ArduinoSetupLoop";
import { NodeDataFactory } from "../../../model/node/NodeDataFactory";
import { CliqueProcessor } from "../../CliqueProcessor";

export class PromptFrameProcessor extends CliqueProcessor {

    private static readonly PROMPT_NODE_ID = "Prompt";
    private static readonly PRECURSOR_NODE_ID = "Precursor";
    private static readonly KEY_NODE_ID = "Key";

    getId(): string {
        return "hal.ai.promptFrame";
    }

    getName(): string {
        return "Prompt Frame";
    }

    public process(): void {
        const cliqueNodes: SourceNode[] = this.getCliqueNodes();
        const promptNode = cliqueNodes.find(node => node.getId() === PromptFrameProcessor.PROMPT_NODE_ID);
        const precursorNode = cliqueNodes.find(node => node.getId() === PromptFrameProcessor.PRECURSOR_NODE_ID);
        const keyNode = cliqueNodes.find(node => node.getId() === PromptFrameProcessor.KEY_NODE_ID);

        console.log("PromptFrame processor running.");

        if (promptNode === undefined) {
            this.addError("The PromptFrame processor expects a prompt node named 'Prompt'.");
            return;
        }
        if (precursorNode === undefined) {
            this.addError("The PromptFrame processor expects a precursor node named 'Precursor'.");
            return;
        }
        if (keyNode === undefined) {
            this.addError("The PromptFrame processor expects a key node named 'Key'.");
            return;
        } 
    }

}
