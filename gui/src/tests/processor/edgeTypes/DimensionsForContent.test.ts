import { DimensionsForContent } from "../../../processors/edgeTypes/DimensionsForContent";
import { Dimensions } from "reactflow";

test("minimum", () => {
    //given
    const dimensionForContent: DimensionsForContent = new DimensionsForContent("");
    //when
    const actual: Dimensions = dimensionForContent.dimension();
    expect(actual).toEqual({width: 300, height: 200});
});

test("arduino example", () => {
    //given
    const dimensionForContent: DimensionsForContent = new DimensionsForContent(`const int LED_PIN = 13;
void setup(){
 pinMode(LED_PIN, OUTPUT);
}

void loop(){
 digitalWrite(LED_PIN, HIGH);
 delay(1000);
 digitalWrite(LED_PIN, LOW);
 delay(1000);
}`);
    //when
    const actual: Dimensions = dimensionForContent.dimension();
    expect(actual).toEqual({width: 348, height: 330});
});

test("maximum", () => {
    //given
    const dimensionForContent: DimensionsForContent = new DimensionsForContent(`
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
At vero eos et accusam et justo duo dolores et ea rebum.
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
At vero eos et accusam et justo duo dolores et ea rebum.
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
At vero eos et accusam et justo duo dolores et ea rebum.
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
At vero eos et accusam et justo duo dolores et ea rebum.
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
At vero eos et accusam et justo duo dolores et ea rebum.
At vero eos et accusam et justo duo dolores et ea rebum.
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`);
    //when
    const actual: Dimensions = dimensionForContent.dimension();
    expect(actual).toEqual({width: 640, height: 480});
});
