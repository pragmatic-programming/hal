import { Processor } from "kico";
import { IHGraph } from "ihgraph";
import { Edge, Node } from "reactflow";
import { createNodeFromSourceNode } from "../node/createNode";
import { FlowState } from "./FlowState";

import { isEdgeTypeIndicator } from "../edge/EdgeTypeIndicator";
import { createEdgeFromEdgeType } from "../edge/createEdge";

export class IHGraphToFlowProcessor extends Processor<IHGraph, FlowState> {

    async process() {
        const ihGraph: IHGraph = this.getModel();
        const nodes: Node[] = [];
        for (const sourceNode of ihGraph.getSourceNodes()) {
            nodes.push(createNodeFromSourceNode(sourceNode));
        }
        const edges: Edge[] = [];
        for (const edge of ihGraph.getEdges()) {
            const sourceId = edge.getSourceNode().getId();
            const targetId = edge.getTargetNode().getId();
            const edgeType = edge.getType().getId();
            if (!sourceId) {
                throw new Error("Returned sourceId is undefined");
            }
            if (!targetId) {
                throw new Error("Returned targetId is undefined");
            }
            if(!isEdgeTypeIndicator(edgeType)){
                throw new Error("EdgeType is not a valid edgeTypeIndicator");
            }
            edges.push(createEdgeFromEdgeType(edgeType, sourceId, targetId));
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
