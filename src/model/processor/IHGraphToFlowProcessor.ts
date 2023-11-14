import { Processor } from "kico";
import { IHGraph } from "ihgraph";
import { Edge, Node } from "reactflow";
import { createNodeFromSourceNode } from "../node/createNode";
import { FlowState } from "./FlowState";
import { createEdgeFromTransformationEdge } from "../edge/createEdge";

export class IHGraphToFlowProcessor extends Processor<IHGraph, FlowState> {

    async process() {
        const ihGraph: IHGraph = this.getModel();
        const nodes: Node[] = [];
        for (const sourceNode of ihGraph.getSourceNodes()) {
            nodes.push(createNodeFromSourceNode(sourceNode));
        }
        const edges: Edge[] = [];
        for (const edge of ihGraph.getEdges()) {
            edges.push(createEdgeFromTransformationEdge(edge));
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
