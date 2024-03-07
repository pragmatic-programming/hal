import { IndentedString } from "./IndentedString";

export class ArduinoSetupLoop {
    private setup: IndentedString;
    private loop: IndentedString;

    constructor(setup: IndentedString, loop: IndentedString) {
        this.setup = setup;
        this.loop = loop;
    }

    content(): string {
        return `void setup(){
${this.setup.indented()}
}

void loop(){
${this.loop.indented()}
}`;
    }
}
