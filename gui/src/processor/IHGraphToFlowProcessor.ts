import { Processor } from "@pragmatic-programming/kico";
import { IHGraph, assert } from "@pragmatic-programming/ihgraph";
import { Edge, Node } from "reactflow";
import { NodesAndEdges } from "../model/NodesAndEdges";
import { NodeFactory } from "../model/node/NodeFactory";
import { EdgeFactory } from "../model/edge/EdgeFactory";
import { edgeTypeIndicators } from "../model/edge/EdgeTypeIndicator";

export class IHGraphToFlowProcessor extends Processor<IHGraph, NodesAndEdges> {
    getId() {
        return "hal.flow.to";
    }

    getName() {
        return "To Flow";
    }

    process(): void {
        const ihGraph: IHGraph = this.getModel();
        assert(ihGraph.consistency());
        const nodes: Node[] = [];
        for (const sourceNode of ihGraph.getSimpleNodes()) {
            nodes.push(NodeFactory.fromSourceNode(sourceNode));
        }
        const edges: Edge[] = [];
        for (const edge of ihGraph.getEdges()) {
            edges.push(EdgeFactory.fromTransformationEdge(edge));
        }
        // TODO: workaround. it should be possible to provide an unknown type and the view then just shows the prototype.
        edges.forEach(edge => { if (edgeTypeIndicators.find(edgeTypeIndicator => edgeTypeIndicator === edge.type) === undefined) { edge.type = "prototype"; } });
        this.setModel({nodes, edges});

        console.debug(ihGraph.toStringDebugGraph());
        console.debug({nodes, edges});
    }

}
