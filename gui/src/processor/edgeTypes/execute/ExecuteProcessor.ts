import { CliqueProcessor } from "hal-kico";
import { FlowToIHGraphProcessor } from "../../FlowToIHGraphProcessor";
import { NodeData } from "../../../model/node/NodeData";
import { IHGraph, SourceNode, SourceNodeStatus } from "ihgraph";
import { RemoteExecution } from "./RemoteExecution";
import { LocalExecution } from "./LocalExecution";

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
            const targets: SourceNode[] = await this.targetNodes();
            this.postProcess(targets);
        } catch (e) {
            this.addError(String(e));
        }
    }

    private async targetNodes(): Promise<SourceNode[]> {
        const sources: SourceNode[] = this.getSourceNodes();
        const targets: SourceNode[] = this.getTargetNodes();
        for (const source of sources) {
            const result = await this.result(source);
            for (const target of targets) {
                target.appendContent(result);
            }
        }
        return targets;
    }

    // todo find better name
    private postProcess(targets: SourceNode[]): void {
        const targetGraph: IHGraph = this.createTargetGraph();
        targets.forEach((target, i) => targetGraph.createSourceNode("Eval" + i).setContent(target.getContent()));
        this.setNewClique(targetGraph);
        const node = this.getModel().getSourceNodes()[0];
        // todo this should come from NodeDataFactory
        const nodeData: NodeData = {
            content: node.getContent(),
            label: "Result",
            language: "PlainText",
            type: "editor",
            status: SourceNodeStatus.SUCCESS,
        };
        node.createAnnotation(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA, nodeData);
    }

    private async result(source: SourceNode): Promise<string> {
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
