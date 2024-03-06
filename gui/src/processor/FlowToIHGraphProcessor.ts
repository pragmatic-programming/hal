import { Processor } from "@pragmatic-programming/kico";
import { EdgeType, IHGraph, IHNode, SimpleNode, TransformationEdge } from "@pragmatic-programming/ihgraph";
import { NodesAndEdges } from "../model/NodesAndEdges";
import { NodeData } from "../model/node/NodeData";
import { StrictNode, strictNode } from "../model/node/StrictNode";
import { DefaultProcessors } from "./DefaultProcessors";

export class FlowToIHGraphProcessor extends Processor<NodesAndEdges, IHGraph> {

    public static readonly ANNOTATION_NODE_DATA = "nodeData";
    public static readonly ANNOTATION_EDGE_DATA = "edgeData";

    async process(): Promise<void> {
        const model: NodesAndEdges = this.getModel();
        const graph: IHGraph = new IHGraph();

        // Test all included edge types beforehand because we only want to add edge types that are actually used.
        for (const edge of model.edges) {
            const label: string = edge.label as string;
            if (!graph.getEdgeTypeById(label)) {
                const edgeData = edge.data!;
                graph.createEdgeType(edge.label as string, edgeData.priority).setImmediate(edgeData.immediate);
                graph.getTransformationConfiguration().setById(
                    label,
                    DefaultProcessors.getProcessor(label)
                );

                console.debug(`Added edge type ${edge.label}, ${edgeData.priority}, ${edgeData.immediate}`);
            }
        }

        for (let unsafeNode of model.nodes) {
            const node: StrictNode<NodeData> = strictNode(unsafeNode);
            const sourceNode: SimpleNode = graph.createSimpleNode(node.id);
            let data: NodeData = {
                ...node.data,
            };
            // set content from node data,
            // because reactFlow has no content field and
            // ihgraph processors don't work with node data annotation
            if (data.type !== "create" && data.type !== "hierarchy") {
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
                throw new Error(`Returned EdgeType ${edge.label as string} is undefined`);
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
