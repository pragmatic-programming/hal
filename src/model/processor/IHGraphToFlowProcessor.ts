import { Processor } from "kico";
import { IHGraph } from "ihgraph";
import { FlowState } from "../../State";
import { Edge, Node } from "reactflow";
import { markerEnd } from "../example";

export class IHGraphToFlowProcessor extends Processor<IHGraph, FlowState> {

    process() {
        const ihGraph: IHGraph = this.getModel();
        const nodes: Node[] = [];
        for (const sourceNode of ihGraph.getSourceNodes()) {
            nodes.push({
                id: sourceNode.getId(),
                type: "editorNode",
                data: {value: sourceNode.getContent()},
                position: {x: 50, y: 25},
            });
        }
        const edges: Edge[] = [];
        for (const edge of ihGraph.getEdges()) {
            const sourceId = edge.getSourceNode().getId();
            const targetId = edge.getTargetNode().getId();
            const edgeType = edge.getType().getId();
            if (!sourceId) {
                throw new Error("Returned sourceId is undefined");
            }
            if (!targetId) {
                throw new Error("Returned targetId is undefined");
            }
            
            let edgeLabel = "";
            let edgeStyle = "";
            let edgeIsAnimated = false;

            if (edgeType === "sequence") {
                edgeLabel = "sequence";
                edgeStyle = "smoothstep";
            } else if (edgeType === "execute") {
                edgeLabel = "Execute";
                edgeIsAnimated = true;
            } else {
                throw new Error("Unknown edge type: " + edgeType);
            }

            edges.push({
                id: "e" + sourceId + "-" + targetId, 
                source: sourceId, 
                target: targetId,
                label: edgeLabel,
                type: edgeStyle,
                animated: edgeIsAnimated,
                markerEnd: markerEnd
            });
        }
        this.setModel(new FlowState(nodes, edges));
    }

    getId() {
        return "hal.flow.to";
    }

    getName() {
        return "To Flow";
    }
}
