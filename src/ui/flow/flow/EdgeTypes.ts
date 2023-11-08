import { EdgeTypes } from "reactflow";
import EdgedStyled from "../edge/EdgedStyled";


export const edgeTypes = [
    "sequence",
    "execute",
    "scchart"
] as const;

export const edgeTypesMapping: EdgeTypes = {
    sequence: EdgedStyled,
    execute: EdgedStyled,
    scchart: EdgedStyled
};

export type edgeType = typeof edgeTypes[number];

export function isEdgeType(edgeType: unknown): edgeType is edgeType {
    return typeof edgeType === "string" && edgeTypes.find(value => value === edgeType) !== undefined;
}
