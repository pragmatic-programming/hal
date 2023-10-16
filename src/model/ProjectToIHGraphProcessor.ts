import { Processor } from "kico";
import { Project } from "./Project";
import { IHGraph } from "ihgraph";

export class ProjectToIHGraphProcessor extends Processor<Project, IHGraph> {

    process() {
        const graph = new IHGraph();
        const edgeType = graph.createEdgeType("sequence", 1);
        const model = this.getModel();
        for (let editor of model.editors()) {
            graph.createSourceNode(editor.id.toString());
        }
        for (let edge of model.edges()) {
            let source = graph.getNodeById(edge.from.toString());
            let target = graph.getNodeById(edge.to.toString());
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
        this.setModel(graph);
    }

    getId() {
        return "hal.projecttoihgraphprocessor";
    }

    getName() {
        return "ProjectToIHGraphProcessor";
    }
}
