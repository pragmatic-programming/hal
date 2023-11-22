import { NodeDataImage } from "../../../model/node/NodeData";
import { FlowToIHGraphProcessor } from "../../FlowToIHGraphProcessor";
import { SCChartDiagram } from "./SCChartDiagram";
import { CliqueProcessor } from "hal-kico";
import { NodeDataFactory } from "../../../model/node/NodeDataFactory";
import { SourceNodeStatus } from "ihgraph";

export class SCChartDiagramProcessor extends CliqueProcessor {

    getId() {
        return "hal.scchart";
    }

    getName() {
        return "SCChart";
    }

    isAsync() {
        return true;
    }

    async processAsync(): Promise<void> {
        const cliqueNodes = this.getCliqueNodes();
        try {
            const scChartImage: SCChartDiagram = new SCChartDiagram(cliqueNodes[0]);
            const image: HTMLImageElement = await this.htmlImageElement(
                await scChartImage.diagram()
            );
            for (const targetNode of cliqueNodes.slice(1)) {
                targetNode.createAnnotation(
                    FlowToIHGraphProcessor.ANNOTATION_NODE_DATA,
                    this.nodeData(image)
                );
                targetNode.setContent(image.src);
            }
        } catch (e) {
            this.addError(String(e));
        }
    }


    private async htmlImageElement(image64: string): Promise<HTMLImageElement> {
        let img: HTMLImageElement = new Image();
        img.src = image64;
        await img.decode();
        return img;
    }

    private nodeData(img: HTMLImageElement): NodeDataImage {
        return NodeDataFactory.nodeDataImage(
            img.src,
            img.height,
            img.width,
            SourceNodeStatus.UNDEFINED,
        );
    }
}
