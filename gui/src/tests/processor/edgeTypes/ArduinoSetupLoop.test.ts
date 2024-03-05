import { IndentedString } from "../../../processors/edgeTypes/IndentedString";
import { ArduinoSetupLoop } from "../../../processors/edgeTypes/ArduinoSetupLoop";

test("blink example", () => {
    //given
    const arduinoSetupLoop: ArduinoSetupLoop = new ArduinoSetupLoop(
        new IndentedString("pinMode(LED_BUILTIN, OUTPUT);"),
        new IndentedString(`digitalWrite(LED_BUILTIN, HIGH);\ndelay(1000);\ndigitalWrite(LED_BUILTIN, LOW);\ndelay(1000);`)
    )
    //when
    const actual = arduinoSetupLoop.content();
    expect(actual).toEqual(`void setup(){
 pinMode(LED_BUILTIN, OUTPUT);
}

void loop(){
 digitalWrite(LED_BUILTIN, HIGH);
 delay(1000);
 digitalWrite(LED_BUILTIN, LOW);
 delay(1000);
}`);
});

