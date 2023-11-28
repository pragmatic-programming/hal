import { CliqueProcessor } from "hal-kico";
import { IHGraph, SourceNode, SourceNodeStatus } from "ihgraph";
import { NodeData, NodeDataEditor } from "../../model/node/NodeData";
import { FlowToIHGraphProcessor } from "../FlowToIHGraphProcessor";
import { IndentedString } from "./IndentedString";
import { ArduinoSetupLoop } from "./ArduinoSetupLoop";
import { NodeDataFactory } from "../../model/node/NodeDataFactory";

export class ArduinoProcessor extends CliqueProcessor {

    getId(): string {
        return "hal.arduino";
    }

    getName(): string {
        return "Arduino";
    }

    public process(): void {
        const targetGraph: IHGraph = this.createTargetGraph();
        const target: SourceNode = targetGraph.createSourceNode("Arduino");
        const cliqueNodes: SourceNode[] = this.getCliqueNodes();
        for (let i = 0; i < cliqueNodes.length - 1; i++) {
            const setupNode: SourceNode = cliqueNodes[i];
            const loopNode: SourceNode = cliqueNodes[i + 1];
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
                this.nodeData(content)
            );
            target.setContent(content);
        }
        this.setNewClique(targetGraph);
    }

    private nodeData(code: string): NodeDataEditor {
        return NodeDataFactory.nodeDataEditor(
            code,
            "Arduino",
            "C",
            SourceNodeStatus.UNDEFINED,
        );
    }
}
