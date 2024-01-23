import { Processor } from "@pragmatic-programming/kico";
import { IHGraph } from "@pragmatic-programming/ihgraph";
import { Edge, Node } from "reactflow";
import { NodesAndEdges } from "../model/NodesAndEdges";
import { NodeFactory } from "../model/node/NodeFactory";
import { EdgeFactory } from "../model/edge/EdgeFactory";

export class IHGraphToFlowProcessor extends Processor<IHGraph, NodesAndEdges> {
    getId() {
        return "hal.flow.to";
    }

    getName() {
        return "To Flow";
    }

    process(): void {
        const ihGraph: IHGraph = this.getModel();
        const nodes: Node[] = [];
        for (const sourceNode of ihGraph.getSimpleNodes()) {
            nodes.push(NodeFactory.fromSourceNode(sourceNode));
        }
        const edges: Edge[] = [];
        for (const edge of ihGraph.getEdges()) {
            edges.push(EdgeFactory.fromTransformationEdge(edge));
        }
        this.setModel({nodes, edges});
    }


}
