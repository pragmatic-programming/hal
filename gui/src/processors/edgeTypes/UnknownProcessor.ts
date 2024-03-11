import { CliqueProcessor } from "../directors/CliqueProcessor";

export class UnknownProcessor extends CliqueProcessor {

    getId(): string {
        return "hal.unknown";
    }

    getName(): string {
        return "Unknown";
    }

    public process(): void {
        this.addError("Unknown edge can't be compiled");
    }

}
