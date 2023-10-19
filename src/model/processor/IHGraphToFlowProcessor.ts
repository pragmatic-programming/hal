import { Processor } from "kico";
import { IHGraph } from "ihgraph";
import { FlowState } from "../../State";
import { Edge, Node } from "reactflow";

export class IHGraphToFlowProcessor extends Processor<IHGraph, FlowState> {

    process() {
        const ihGraph: IHGraph = this.getModel();
        const nodes: Node[] = [];
        for (const sourceNode of ihGraph.getSourceNodes()) {
            nodes.push({
                id: sourceNode.getId(),
                type: "editorNode",
                data: {value: sourceNode.getContent()},
                position: {x: 50, y: 25},
            });
        }
        const edges: Edge[] = [];
        for (const edge of ihGraph.getEdges()) {
            const sourceId = edge.getSourceNode().getId();
            const targetId = edge.getTargetNode().getId();
            if (!sourceId) {
                throw new Error("Returned sourceId is undefined");
            }
            if (!targetId) {
                throw new Error("Returned targetId is undefined");
            }
            edges.push(
                {id: "e" + sourceId + "-" + targetId, source: sourceId, target: targetId},
            );
        }
        this.setModel(new FlowState(nodes, edges));
    }

    getId() {
        return "hal.flow.to";
    }

    getName() {
        return "To Flow";
    }
}
