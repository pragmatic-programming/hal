import { CliqueProcessor } from "hal-kico";
import { NodeDataImage } from "../../NodeData";
import { FlowToIHGraphProcessor } from "../FlowToIHGraphProcessor";
import { SourceNode } from "ihgraph";

export class SCChartProcessor extends CliqueProcessor {

    getId() {
        return "hal.scchart";
    }

    getName() {
        return "SCChart";
    }

    async process(): Promise<void> {
        const targetGraph = this.createTargetGraph();
        const targetNode = targetGraph.createSourceNode("Sequence");
        const cliqueNodes = this.getCliqueNodes();

        const image: HTMLImageElement = await this.htmlImageElement(
            await this.fetchSCChartImage(cliqueNodes[0])
        );
        targetNode.createAnnotation(
            FlowToIHGraphProcessor.ANNOTATION_NODE_DATA,
            this.nodeData(image)
        );
        targetNode.setContent(image.src);
        this.setNewClique(targetGraph);
    }

    private async fetchSCChartImage(sourceNode: SourceNode): Promise<string> {
        const response: Response = await fetch(
            "http://localhost:8080/kicodia/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    payload: sourceNode.getContent()
                })
            }
        );
        return URL.createObjectURL(await response.blob());
    }

    private async htmlImageElement(image64: string): Promise<HTMLImageElement> {
        let img = new Image();
        img.src = image64;
        await img.decode();
        return img;
    }

    private nodeData(img: HTMLImageElement): NodeDataImage {
        return {
            content: img.src,
            height: img.height,
            type: "image",
            width: img.width,
        };
    }
}
