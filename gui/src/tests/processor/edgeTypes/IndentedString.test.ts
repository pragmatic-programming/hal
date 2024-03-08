import { IndentedString } from "../../../processors/edgeTypes/IndentedString";

test("empty value", () => {
    //given
    const indentedString: IndentedString = new IndentedString("");
    //when
    const actual = indentedString.indented();
    expect(actual).toEqual(" ");
});

test("one line", () => {
    //given
    const indentedString: IndentedString = new IndentedString("line\n");
    //when
    const actual = indentedString.indented();
    expect(actual).toEqual(" line\n ");
});

test("three lines", () => {
    //given
    const indentedString: IndentedString = new IndentedString("line1\nline2\nline3");
    //when
    const actual = indentedString.indented();
    expect(actual).toEqual(" line1\n line2\n line3");
});

