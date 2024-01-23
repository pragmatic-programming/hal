import { Processor } from "kico";
import { EdgeType, IHGraph, IHNode, SimpleNode, TransformationDirection, TransformationEdge } from "ihgraph";
import { NodesAndEdges } from "../model/NodesAndEdges";
import { NodeData } from "../model/node/NodeData";
import { edgeDefinitions } from "../model/edge/edgeDefinitions";
import { StrictNode, strictNode } from "../model/node/StrictNode";


export class FlowToIHGraphProcessor extends Processor<NodesAndEdges, IHGraph> {

    public static readonly ANNOTATION_NODE_DATA = "nodeData";
    public static readonly ANNOTATION_EDGE_DATA = "edgeData";

    async process(): Promise<void> {
        const graph: IHGraph = new IHGraph();

        for (const edgeDefinition of edgeDefinitions) {
            const edgeType = graph.createEdgeType(edgeDefinition.type, edgeDefinition.priority).setImmediate(edgeDefinition.immediate);
            if (edgeDefinition.transformationDirection === "dependency") {
                edgeType.setTransformationDirection(TransformationDirection.DEPENDENCY);
            }
            graph.getTransformationConfiguration().setById(edgeDefinition.type, edgeDefinition.processor);
        }

        const model: NodesAndEdges = this.getModel();
        for (let unsafeNode of model.nodes) {
            const node: StrictNode<NodeData> = strictNode(unsafeNode);
            const sourceNode: SimpleNode = graph.createSimpleNode(node.id);
            let data: NodeData = {
                ...node.data,
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
            const source: IHNode | undefined = graph.getNodeById(edge.source);
            const target: IHNode | undefined = graph.getNodeById(edge.target);
            const edgeType: EdgeType | undefined = graph.getEdgeTypeById(edge.label as string);
            if (!source) {
                throw new Error("Returned SourceNode is undefined");
            }
            if (!target) {
                throw new Error("Returned TargetNode is undefined");
            }
            if (!edgeType) {
                throw new Error("Returned EdgeType is undefined: " + edge.label + "");
            }
            const transformationEdge: TransformationEdge = graph.createTransformationEdge(edgeType, source, target);
            transformationEdge.createAnnotation(FlowToIHGraphProcessor.ANNOTATION_EDGE_DATA, edge.data);
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
