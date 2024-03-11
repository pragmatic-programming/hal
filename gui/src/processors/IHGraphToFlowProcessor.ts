import { Processor, Property } from "@pragmatic-programming/kico";
import { IHGraph, assert } from "@pragmatic-programming/ihgraph";
import { Edge, Node } from "reactflow";
import { NodesAndEdges } from "../model/NodesAndEdges";
import { NodeFactory } from "../model/node/NodeFactory";
import { EdgeFactory } from "../model/edge/EdgeFactory";
import { edgeTypeIndicators } from "../model/edge/EdgeTypeIndicator";

export class IHGraphToFlowProcessor extends Processor<IHGraph, NodesAndEdges> {

    public static readonly IHGRAPH_HIERARCHY: Property<boolean> =
        new Property<boolean>("HAL.ihgraph.hierarchy", () => false);

    getId() {
        return "hal.flow.to";
    }

    getName() {
        return "To Flow";
    }

    process(): void {
        let ihGraph: IHGraph = this.getModel();
        if (this.getProperty(IHGraphToFlowProcessor.IHGRAPH_HIERARCHY)) {
            ihGraph = this.getModel().getInducedHierarchy();
        }
        assert(ihGraph.consistency());

        const flowGraph: NodesAndEdges = this.createFlow(ihGraph, null);
        this.setModel(flowGraph);

        console.debug(flowGraph);
    }

    protected createFlow(ihGraph: IHGraph, parent: Node | null): NodesAndEdges {
        const nodes: Node[] = [];
        const edges: Edge[] = [];

        for (const simpleNode of ihGraph.getSimpleNodes()) {
            const node: Node = NodeFactory.fromSourceNode(simpleNode)
            if (parent) {
                node.parentNode = parent.id;
            }
            nodes.push(node);
        }
        for (const graphNode of ihGraph.getGraphNodes()) {
            // Workaround. The induces hierarchy currently also clones the ids, so that they are not unique.
            // Therefore, the ids are re-set to the hash code of the graph node, which is unique.
            // TODO: Remove after upgrading to ihgraph rc4.
            graphNode.setId("id" + graphNode.hashCode());
            const hierarchyNode: Node = NodeFactory.fromGraphNode(graphNode);
            if (parent) {
                hierarchyNode.parentNode = parent.id;
            }
            nodes.push(hierarchyNode);
            const subFlowGraph: NodesAndEdges = this.createFlow(graphNode, hierarchyNode);
            nodes.push(...subFlowGraph.nodes);
            edges.push(...subFlowGraph.edges);
        }
        for (const edge of ihGraph.getEdges()) {
            edges.push(EdgeFactory.fromTransformationEdge(edge));
        }
        // TODO: workaround. it should be possible to provide an unknown type and the view then just shows the prototype.
        edges.forEach(edge => { if (edgeTypeIndicators.find(edgeTypeIndicator => edgeTypeIndicator === edge.type) === undefined) { edge.type = "prototype"; } });

        return {nodes, edges};
    }

}
