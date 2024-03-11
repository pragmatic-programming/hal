import { CliqueProcessor } from "../directors/CliqueProcessor";

export class SequenceProcessor extends CliqueProcessor {

    public getId(): string {
        return "SequenceProcessor";
    }

    public getName(): string {
        return "Sequence";
    }

    public process() {
        const targetGraph = this.createTargetGraph();
        const sourceNode = targetGraph.createSimpleNode("Sequence");
        const cliqueNodes = this.getCliqueNodes();
        let content = "";

        cliqueNodes.forEach(node => {
            content += node.getContent() + "\n";
        });

        sourceNode.setContent(content);
        // todo this is different to SequenceProcessor of hal-kico
        cliqueNodes[1].cloneAnnotationsTo(sourceNode);
        this.setNewClique(targetGraph);
    }

}
