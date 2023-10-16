import { Processor } from "kico";
import { Project } from "./Project";
import { IHGraph } from "ihgraph";

export class KicoProcessor extends Processor<Project, IHGraph> {

    process() {
        const input = this.getModel();
        const ihGraph = new IHGraph();
        ihGraph.createSourceNode(input.name);
        this.setModel(ihGraph);
    }

    getId() {
        return "kico.identity";
    }

    getName() {
        return "Identity";
    }
}
