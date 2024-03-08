import {NodeDataImage} from "../../../model/node/NodeData";
import {FlowToIHGraphProcessor} from "../../FlowToIHGraphProcessor";
import {SCChartDiagram} from "./SCChartDiagram";
import {NodeDataFactory} from "../../../model/node/NodeDataFactory";
import {SimpleNodeStatus} from "@pragmatic-programming/ihgraph";
import { CliqueProcessor } from "../../directors/CliqueProcessor";

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
        try {
            const scChartImage: SCChartDiagram = new SCChartDiagram(this.getSourceNodes()[0]);
            const image: HTMLImageElement = await this.htmlImageElement(
                await scChartImage.diagram()
            );

            for (const targetNode of this.getTargetNodes()) {
                targetNode.createAnnotation(
                    FlowToIHGraphProcessor.ANNOTATION_NODE_DATA,
                    this.nodeData(image)
                );
                targetNode.setContent(image.src);
            }
        } catch (e) {
            this.addError(String(e));
        }

        if (!this.isImmediate()) {
            for (const sourceNode of this.getSourceNodes()) {
                sourceNode.getParent().removeNode(sourceNode);
            }
        }

        this.set();
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
            undefined,
            img.width,
            img.height,
            SimpleNodeStatus.UNDEFINED,
        );
    }
}
