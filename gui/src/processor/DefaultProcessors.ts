import { PromptFrameProcessor } from "./edgeTypes/ai/PromptFrameProcessor";
import { retrieveEdgeDefinition } from "../model/edge/edgeDefinitions";
import { TransformationProcessor } from "@pragmatic-programming/ihgraph";

export class DefaultProcessors {

    static getProcessor(processorId: string): typeof TransformationProcessor {
        switch (processorId) {
            case "promptframe":
                return PromptFrameProcessor;
            default:
                return retrieveEdgeDefinition(processorId).processor;
        }
    }

}
