import { Processor } from "kico";
import { Project } from "./Project";
import { IHGraph } from "ihgraph";
import { loadDefaultTransformationConfiguration } from "hal-kico";

export class ProjectToIHGraphProcessor extends Processor<Project, IHGraph> {

    process() {
        const graph = new IHGraph();
        const edgeType = graph.createEdgeType("Sequence", 1);
        const model = this.getModel();
        for (const editor of model.editors()) {
            if (!editor.value) {
                throw new Error("Editor value is undefined");
            }
            graph.createSourceNode(editor.id.toString()).setContent(editor.value);
        }
        for (const edge of model.edges()) {
            const source = graph.getNodeById(edge.from.toString());
            const target = graph.getNodeById(edge.to.toString());
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
        return "hal.project";
    }

    getName() {
        return "Project";
    }
}
