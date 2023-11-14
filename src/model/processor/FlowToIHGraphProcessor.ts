import { Processor } from "kico";
import { IHGraph, TransformationDirection } from "ihgraph";
import { FlowState } from "./FlowState";
import { NodeData } from "../node/NodeData";
import { edgeDefinitions } from "../edge/edgeDefinitions";


export class FlowToIHGraphProcessor extends Processor<FlowState, IHGraph> {

    public static readonly ANNOTATION_NODE_DATA = "nodeData";

    async process() {
        const graph = new IHGraph();

        for (const edgeDefinition of edgeDefinitions) {
            const edgeType = graph.createEdgeType(edgeDefinition.type, edgeDefinition.priority).setImmediate(edgeDefinition.immediate);
            if (edgeDefinition.transformationDirection === "dependency") {
                edgeType.setTransformationDirection(TransformationDirection.DEPENDENCY);
            }
            graph.getTransformationConfiguration().setById(edgeDefinition.type, edgeDefinition.processor);
        }

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
            // set content from node data,
            // because reactFlow has no content field and
            // ihgraph processors don't work with node data annotation
            if (data.type !== "create") {
                sourceNode.setContent(data.content ? data.content : "");
            }
            // set node data annotation in case the ihgraph will be rendered
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


        this.setModel(graph);
    }

    getId() {
        return "hal.flow.from";
    }

    getName() {
        return "From Flow";
    }
}
