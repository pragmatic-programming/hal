import { IHGraph, SimpleNode, SimpleNodeStatus } from "@pragmatic-programming/ihgraph";
import { NodeData } from "../../model/node/NodeData";
import { FlowToIHGraphProcessor } from "../FlowToIHGraphProcessor";
import { IndentedString } from "./IndentedString";
import { ArduinoSetupLoop } from "./ArduinoSetupLoop";
import { NodeDataFactory } from "../../model/node/NodeDataFactory";
import { CliqueProcessor } from "../directors/CliqueProcessor";

export class ArduinoProcessor extends CliqueProcessor {

    getId(): string {
        return "hal.arduino";
    }

    getName(): string {
        return "Arduino";
    }

    public process(): void {
        const targetGraph: IHGraph = this.createTargetGraph();
        const target: SimpleNode = targetGraph.createSimpleNode("Arduino");
        const cliqueNodes: SimpleNode[] = this.getCliqueNodes();
        for (let i = 0; i < cliqueNodes.length - 1; i++) {
            const setupNode: SimpleNode = cliqueNodes[i];
            const loopNode: SimpleNode = cliqueNodes[i + 1];
            const sourceNodeNodeData: NodeData = setupNode.getAnnotationData<NodeData>("nodeData");
            const targetNodeNodeData: NodeData = loopNode.getAnnotationData<NodeData>("nodeData");
            if (sourceNodeNodeData.type !== "editor") {
                throw new Error("SourceNode is not from type editor");
            }
            if (targetNodeNodeData.type !== "editor") {
                throw new Error("TargetNode is not from type editor");
            }
            const arduinoSetupLoop: ArduinoSetupLoop = new ArduinoSetupLoop(
                IndentedString.fromSourceNode(setupNode),
                IndentedString.fromSourceNode(loopNode),
            );
            const content: string = arduinoSetupLoop.content();
            target.createAnnotation(
                FlowToIHGraphProcessor.ANNOTATION_NODE_DATA,
                NodeDataFactory.nodeDataEditor(
                    content,
                    "Arduino",
                    "C",
                    SimpleNodeStatus.UNDEFINED,
                    undefined,
                    300,
                    200
                )
            );
            target.setContent(content);
        }
        this.setNewClique(targetGraph);
    }

}
