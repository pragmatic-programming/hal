import { Position } from "reactflow";

export const layoutDirectionIndicators = [
    "DOWN",
    "RIGHT",
] as const;

export type LayoutDirectionIndicator = typeof layoutDirectionIndicators[number];

export function isLayoutDirectionIndicator(layoutDirectionIndicator: unknown): layoutDirectionIndicator is LayoutDirectionIndicator {
    return typeof layoutDirectionIndicator === "string" && layoutDirectionIndicators.find((value: LayoutDirectionIndicator): boolean => value === layoutDirectionIndicator) !== undefined;
}

export function sourcePosition(layoutDirectionIndicator: LayoutDirectionIndicator): Position {
    return layoutDirectionIndicator === "DOWN" ? Position.Bottom : Position.Right;
}

export function targetPosition(layoutDirectionIndicator: LayoutDirectionIndicator): Position {
    return layoutDirectionIndicator === "DOWN" ? Position.Top : Position.Left;
}
