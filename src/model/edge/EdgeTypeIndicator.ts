// new edge (step 1): add a new edge type indicator here
const edgeTypeIndicators = [
    "create",
    "execute",
    "scchart",
    "sequence",
    "test",
] as const;

export type EdgeTypeIndicator = typeof edgeTypeIndicators[number];

export function isEdgeTypeIndicator(edgeTypeIndicator: unknown): edgeTypeIndicator is EdgeTypeIndicator {
    return typeof edgeTypeIndicator === "string" && edgeTypeIndicators.find((value: EdgeTypeIndicator) => value === edgeTypeIndicator) !== undefined;
}
