
import * as ihgraph from "@pragmatic-programming/ihgraph";
import { SequenceProcessor } from "./SequenceProcessor";
import { PromptFrameProcessor } from "./edgeTypes/ai/PromptFrameProcessor";
import { ArduinoProcessor } from "./edgeTypes/ArduinoProcessor";
import { ExecuteProcessor } from "./edgeTypes/execute/ExecuteProcessor";
import { TranspileProcessor } from "./edgeTypes/transpile/TranspileProcessor";
import { SCChartDiagramProcessor } from "./edgeTypes/scchart/SCChartDiagramProcessor";
import { TestProcessor } from "./edgeTypes/TestProcessor";
import { UnknownProcessor } from "./edgeTypes/UnknownProcessor";

export class DefaultProcessors {

    static getProcessor(processorId: string): typeof ihgraph.TransformationProcessor {
        switch (processorId) {
            case "unknown":
                return UnknownProcessor;
            case "arduino":
                return ArduinoProcessor;
            case "execute":
                return ExecuteProcessor;
            case "promptframe":
                return PromptFrameProcessor;
            case "scchartdiagram":
                return SCChartDiagramProcessor;
            case "sequence":
                return SequenceProcessor;
            case "test":
                return TestProcessor;
            case "transpile":
                return TranspileProcessor;
            default:
                return UnknownProcessor;
        }
    }

}