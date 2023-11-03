import { Processor } from "kico";
import { IHGraph } from "ihgraph";
import { EvalProcessor, SequenceProcessor } from "hal-kico";
import { FlowState } from "../FlowState";


export class FlowToIHGraphProcessor extends Processor<FlowState, IHGraph> {

    process() {
        const graph = new IHGraph();
        graph.createEdgeType("sequence", 8);
        graph.createEdgeType("execute", 2);

        const model = this.getModel();
        for (const node of model.nodes) {
            graph.createSourceNode(node.id).setContent(node.data.content ? node.data.content : "");
        }
        for (const edge of model.edges) {
            const source = graph.getNodeById(edge.source);
            const target = graph.getNodeById(edge.target);
            const edgeType = graph.getEdgeTypeById(edge.label as string);
            if (!source) {
                throw new Error("Returned SourceNode is undefined");
            }
            if (!target) {
                throw new Error("Returned TargetNode is undefined");
            }
            if (!edgeType) {
                throw new Error("Returned EdgeType is undefined: " + edge.label + "");
            }
            graph.createTransformationEdge(
                edgeType,
                source,
                target
            );
        }
        graph.getTransformationConfiguration().setById("sequence", SequenceProcessor);
        graph.getTransformationConfiguration().setById("execute", EvalProcessor);
        this.setModel(graph);
    }

    getId() {
        return "hal.flow.from";
    }

    getName() {
        return "From Flow";
    }
}
