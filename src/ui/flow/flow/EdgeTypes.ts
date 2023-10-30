import { EdgeTypes } from "reactflow";
import EdgedStyled from "../edge/EdgedStyled";

export type edgeType = "sequence" | "execute"

export const edgeTypesMapping: EdgeTypes = {
    sequence: EdgedStyled,
    execute: EdgedStyled,
};
