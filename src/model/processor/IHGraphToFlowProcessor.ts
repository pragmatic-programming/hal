import { Processor } from "kico";
import { IHGraph } from "ihgraph";
import { Edge, Node } from "reactflow";
import { FlowState } from "./FlowState";
import { NodeFactory } from "../node/NodeFactory";
import { EdgeFactory } from "../edge/EdgeFactory";

export class IHGraphToFlowProcessor extends Processor<IHGraph, FlowState> {

    async process() {
        const ihGraph: IHGraph = this.getModel();
        const nodes: Node[] = [];
        for (const sourceNode of ihGraph.getSourceNodes()) {
            nodes.push(NodeFactory.fromSourceNode(sourceNode));
        }
        const edges: Edge[] = [];
        for (const edge of ihGraph.getEdges()) {
            edges.push(EdgeFactory.fromTransformationEdge(edge));
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
