import { HalEdge } from "./HalEdge";
import { edgeDefinitionSequence } from "./edgeDefinitions";
import { EdgeFactory } from "./EdgeFactory";

describe("transformByEdgeDefinition", () => {

    test("sequence edge", () => {
        const halEdge = new HalEdge(EdgeFactory.fromEdgeDefinition(edgeDefinitionSequence, "1", "2", "bottom", "top"));
        expect(() => halEdge.transformByEdgeDefinition(edgeDefinitionSequence))
            .toThrowError("Edge is not from type create");
    });

    test("create node", () => {
        const halEdge = new HalEdge(EdgeFactory.edgeCreate("1", "2", "bottom", "top"));
        const expected = EdgeFactory.fromEdgeDefinition(edgeDefinitionSequence, "1", "2", "bottom", "top");
        expect(halEdge.transformByEdgeDefinition(edgeDefinitionSequence)).toEqual(expected);
    });
});


