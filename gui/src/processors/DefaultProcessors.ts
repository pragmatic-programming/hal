import { PromptFrameProcessor } from "./edgeTypes/ai/PromptFrameProcessor";
import { retrieveEdgeDefinition } from "../model/edge/edgeDefinitions";
import { TransformationProcessor } from "@pragmatic-programming/ihgraph";

export class DefaultProcessors {

    static getProcessor(processorId: string): typeof TransformationProcessor {

        console.log("getProcessor...")

        const processors : [string, any][] = (window as any).__additionalProcessors;
        const found = processors.find(item => item[0] === processorId);

        console.log("Found additional processors: " + processors);
        console.log("Found " + found)

        if (found !== undefined)
            return found[1];

        switch (processorId) {
            case "promptframe":
                return PromptFrameProcessor;
            default:
                return retrieveEdgeDefinition(processorId).processor;
        }
    }
}
