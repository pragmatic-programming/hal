import { CliqueProcessor } from "hal-kico";

export class CreateProcessor extends CliqueProcessor {

    getId() {
        return "hal.create";
    }

    getName() {
        return "Create";
    }

    process(): void {
        this.addError("Create edge can't be compiled");
    }

}
