import { FlowToIHGraphProcessor } from "../../FlowToIHGraphProcessor";
import { NodeData, NodeDataEditor } from "../../../model/node/NodeData";
import { IHGraph, SimpleNode, SimpleNodeStatus } from "@pragmatic-programming/ihgraph";
import { RemoteExecution } from "./RemoteExecution";
import { LocalExecution } from "./LocalExecution";
import { NodeDataFactory } from "../../../model/node/NodeDataFactory";
import { CliqueProcessor } from "../../directors/CliqueProcessor";

export class ExecuteProcessor extends CliqueProcessor {

    getId() {
        return "hal.execute";
    }

    getName() {
        return "Execute";
    }

    isAsync() {
        return true;
    }

    async processAsync(): Promise<void> {
        try {
            const targets: SimpleNode[] = await this.targetNodes();
            this.postProcess(targets);
        } catch (e) {
            this.addError(String(e));
        }
    }

    private async targetNodes(): Promise<SimpleNode[]> {
        const sources: SimpleNode[] = this.getSourceNodes();
        const targets: SimpleNode[] = this.getTargetNodes();
        for (const source of sources) {
            const result = await this.result(source);
            for (const target of targets) {
                target.appendContent(result);
            }
        }
        return targets;
    }

    // todo find better name
    private postProcess(targets: SimpleNode[]): void {
        const targetGraph: IHGraph = this.createTargetGraph();
        targets.forEach((target, i) => targetGraph.createSimpleNode("Eval" + i).setContent(target.getContent()));
        this.setNewClique(targetGraph);
        const node = this.getModel().getSimpleNodes()[0];
        const nodeData: NodeDataEditor = NodeDataFactory.nodeDataEditor(
            node.getContent(),
            "Result",
            "PlainText",
            SimpleNodeStatus.SUCCESS,
            undefined,
            300,
            200
        );
        node.createAnnotation(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA, nodeData);
    }

    private async result(source: SimpleNode): Promise<string> {
        const nodeData: NodeData = source.getAnnotationData<NodeData>("nodeData");
        if (nodeData.type !== "editor") {
            throw new Error("SourceNode is not from type editor");
        }
        let execution;
        switch (nodeData.language) {
            case "JavaScript":
                execution = new LocalExecution(source);
                break;
            case "Python":
                execution = new RemoteExecution(source);
                break;
            default:
                throw new Error(nodeData.language + " is not supported");
        }
        return execution.text();
    }

}
