import { CliqueProcessor } from "hal-kico";
import { SourceNodeStatus } from "ihgraph";

export class TestProcessor extends CliqueProcessor {

    getId() {
        return "hal.js.wytiwyg";
    }

    getName() {
        return "test";
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
                    node.setStatus(SourceNodeStatus.SUCCESS);
                    break;
                case "false":
                    node.setStatus(SourceNodeStatus.ERROR);
                    break;
            }
        }

    }

}
