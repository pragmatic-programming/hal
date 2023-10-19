import { Processor } from "kico";
import { IHGraph } from "ihgraph";
import { loadDefaultTransformationConfiguration } from "hal-kico";
import { FlowState } from "../../State";


export class FlowToIHGraphProcessor extends Processor<FlowState, IHGraph> {

    process() {
        const graph = new IHGraph();
        const edgeType = graph.createEdgeType("Sequence", 1);
        const model = this.getModel();
        for (const node of model.nodes) {
            graph.createSourceNode(node.id).setContent(node.data.value);
        }
        for (const edge of model.edges) {
            const source = graph.getNodeById(edge.source);
            const target = graph.getNodeById(edge.target);
            if (!source) {
                throw new Error("Returned SourceNode is undefined");
            }
            if (!target) {
                throw new Error("Returned TargetNode is undefined");
            }
            graph.createTransformationEdge(
                edgeType,
                source,
                target
            );
        }
        // todo this line here is just a workaround
        loadDefaultTransformationConfiguration(graph);
        this.setModel(graph);
    }

    getId() {
        return "hal.flow.from";
    }

    getName() {
        return "From Flow";
    }
}
