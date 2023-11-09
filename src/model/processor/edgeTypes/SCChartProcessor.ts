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

    isAsync(){
        return true
    }

    async processAsync(): Promise<void> {
        const targetGraph = this.createTargetGraph();
        const targetNode = targetGraph.createSourceNode("Sequence");
        const cliqueNodes = this.getCliqueNodes();

        try {
            const image: HTMLImageElement = await this.htmlImageElement(
                await this.fetchSCChartImage(cliqueNodes[0])
            );
            targetNode.createAnnotation(
                FlowToIHGraphProcessor.ANNOTATION_NODE_DATA,
                this.nodeData(image)
            );
            targetNode.setContent(image.src);
            this.setNewClique(targetGraph);
        } catch (e) {
            this.addError(String(e));
        }
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
        await this.handleResponseNotOk(response);
        return URL.createObjectURL(await response.blob());
    }

    private async handleResponseNotOk(response: Response) {
        if (!response.ok) {
            throw new Error(await response.text());
        }
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
