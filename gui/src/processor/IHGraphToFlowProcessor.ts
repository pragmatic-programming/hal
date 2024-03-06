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
        const ihGraph: IHGraph = this.getProperty(IHGraphToFlowProcessor.IHGRAPH_HIERARCHY) ? 
            this.getModel().getInducedHierarchy() :
            this.getModel();
        console.debug(ihGraph.toStringDebugGraph());
        assert(ihGraph.consistency());

        const flowGraph: NodesAndEdges = this.createFlow(ihGraph);
        this.setModel(flowGraph);

        console.debug(flowGraph);
    }

    protected createFlow(ihGraph: IHGraph): NodesAndEdges {
        const nodes: Node[] = [];
        const edges: Edge[] = [];       
        
        for (const simpleNode of ihGraph.getSimpleNodes()) {
            nodes.push(NodeFactory.fromSourceNode(simpleNode));
        }
        for (const graphNode of ihGraph.getGraphNodes()) {
            nodes.push(NodeFactory.fromGraphNode(graphNode));
            const subFlowGraph: NodesAndEdges = this.createFlow(graphNode);
            subFlowGraph.nodes.forEach(node => node.parentNode = graphNode.getId());
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
