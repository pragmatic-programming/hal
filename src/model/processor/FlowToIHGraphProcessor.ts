import { Processor } from "kico";
import { IHGraph } from "ihgraph";
import { SequenceProcessor } from "hal-kico";
import { FlowState } from "../FlowState";
import { JSEvalProcessor } from "./edgeTypes/JSEvalProcessor";
import { NodeData } from "../NodeData";


export class FlowToIHGraphProcessor extends Processor<FlowState, IHGraph> {

    public static readonly ANNOTATION_NODE_DATA = "nodeData";

    process() {
        const graph = new IHGraph();
        graph.createEdgeType("sequence", 8);
        graph.createEdgeType("execute", 2);

        const model = this.getModel();
        for (const node of model.nodes) {
            const sourceNode = graph.createSourceNode(node.id);
            const width = node.width;
            const height = node.height;
            if (!width) {
                throw new Error("Width is undefined");
            }
            if (!height) {
                throw new Error("height is undefined");
            }
            let data: NodeData = {
                ...node.data,
                width: width,
                height: height,
            };
            // todo node.data.content is redundant
            if (data.type !== "creation") {
                sourceNode.setContent(data.content ? data.content : "");
            }
            sourceNode.createAnnotation(FlowToIHGraphProcessor.ANNOTATION_NODE_DATA, data);
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
        graph.getTransformationConfiguration().setById("execute", JSEvalProcessor);
        this.setModel(graph);
    }

    getId() {
        return "hal.flow.from";
    }

    getName() {
        return "From Flow";
    }
}
