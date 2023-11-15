import { HalEdge } from "./HalEdge";
import { createEdgeCreate, createEdgeFromEdgeDefinition } from "./createEdge";
import { edgeDefinitionSequence } from "./edgeDefinitions";

describe("transformByEdgeDefinition", () => {

    test("sequence edge", () => {
        const halEdge = new HalEdge(createEdgeFromEdgeDefinition(edgeDefinitionSequence, "1", "2", "bottom", "top"));
        expect(() => halEdge.transformByEdgeDefinition(edgeDefinitionSequence))
            .toThrowError("Edge is not from type create");
    });

    test("create node", () => {
        const halEdge = new HalEdge(createEdgeCreate("1", "2", "bottom", "top"));
        const expected = createEdgeFromEdgeDefinition(edgeDefinitionSequence, "1", "2", "bottom", "top");
        expect(halEdge.transformByEdgeDefinition(edgeDefinitionSequence)).toEqual(expected);
    });
});


