import { SimpleNodeStatus, TransformationDirection } from "@pragmatic-programming/ihgraph";
import { CliqueProcessor } from "../directors/CliqueProcessor";

export class TestProcessor extends CliqueProcessor {

    getId() {
        return "hal.js.wytiwyg";
    }

    getName() {
        return "test";
    }

    getTransformationDirection(): TransformationDirection {
        return TransformationDirection.DEPENDENCY;
    }

    process() {
        const cliqueNodes = this.getCliqueNodes();

        const unit = cliqueNodes.slice(-1)[0].getContent();

        for (let i = 0; i < cliqueNodes.length - 1; i++) {
            const node = cliqueNodes[i];
            const test = node.getContent();

            const content = unit + "\n\n" + test;

            // eslint-disable-next-line no-eval
            const result: string = String(eval(content));

            switch (result) {
                case "true":
                    node.setStatus(SimpleNodeStatus.SUCCESS);
                    break;
                case "false":
                    node.setStatus(SimpleNodeStatus.ERROR);
                    break;
            }
        }

    }

}
