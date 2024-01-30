import { EdgeType, IHGraph, SimpleNode, SimpleNodeStatus } from "@pragmatic-programming/ihgraph";
import { NodeData } from "../../../model/node/NodeData";
import { FlowToIHGraphProcessor } from "../../FlowToIHGraphProcessor";
import { IndentedString } from "../IndentedString";
import { ArduinoSetupLoop } from "../ArduinoSetupLoop";
import { NodeDataFactory } from "../../../model/node/NodeDataFactory";
import { CliqueProcessor } from "../../CliqueProcessor";

export class PromptFrameProcessor extends CliqueProcessor {

    private static readonly PROMPTFRAME_EDGE_TYPE_ID = "promptframe";
    private static readonly PROMPT_NODE_ID = "Prompt";
    private static readonly PRECURSOR_NODE_ID = "Precursor";
    private static readonly REQUEST_NODE_ID = "Request";
    private static readonly RESPONSE_NODE_ID = "Response";
    private static readonly RESULT_NODE_ID = "Result";
    private static readonly KEY_NODE_ID = "Key";

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

        if (promptNode !== undefined && precursorNode !== undefined) {
            this.processRequest(promptNode, precursorNode);
        } else {
            this.processResult();
        }
    }

    public processRequest(promptNode: SimpleNode, precursorNode: SimpleNode): void {
        if (promptNode === undefined) {
            this.addError("The PromptFrame processor expects a prompt node named 'Prompt'.");
            return;
        }
        if (precursorNode === undefined) {
            this.addError("The PromptFrame processor expects a precursor node named 'Precursor'.");
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

    public processResult() {
        const resultGraph = this.createTargetGraph();
        const resultNode = resultGraph.createSimpleNode(PromptFrameProcessor.RESULT_NODE_ID);
        resultNode.setContent("Test");
        this.setNewClique(resultGraph);
        console.log(resultGraph.toStringDebugGraph());
    }

    protected format(s: string): string{
        return s.replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "");
    }
}
