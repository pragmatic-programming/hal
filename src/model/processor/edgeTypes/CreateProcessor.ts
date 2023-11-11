import { CliqueProcessor } from "hal-kico";

export class CreateProcessor extends CliqueProcessor {

    getId() {
        return "hal.create";
    }

    getName() {
        return "Create";
    }

    process(): void {
        //todo Steven: why is this error not thrown?
        throw new Error("Create edge can't be compiled");
    }

}
