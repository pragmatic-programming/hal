import { CliqueProcessor } from "hal-kico";
import { NodeDataImage } from "../../../node/NodeData";
import { FlowToIHGraphProcessor } from "../../FlowToIHGraphProcessor";
import { SCChartImage } from "./SCChartImage";

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
            const scChartImage = new SCChartImage(cliqueNodes[0]);
            const image: HTMLImageElement = await this.htmlImageElement(
                await scChartImage.image()
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
