
import * as ihgraph from "@pragmatic-programming/ihgraph";
import { SequenceProcessor } from "./SequenceProcessor";
import { PromptFrameProcessor } from "./edgeTypes/ai/PromptFrameProcessor";

export const defaultProcessors: {  [key: string]: typeof ihgraph.TransformationProcessor } = {
    sequence: SequenceProcessor,
    promptframe: PromptFrameProcessor 
};