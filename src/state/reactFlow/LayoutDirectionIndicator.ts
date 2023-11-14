import { Position } from "reactflow";
import { LayoutOptions } from "elkjs/lib/elk-api";

export const layoutDirectionIndicators = [
    "DOWN",
    "RIGHT",
] as const;

export type LayoutDirectionIndicator = typeof layoutDirectionIndicators[number];

export function isLayoutDirectionIndicator(layoutDirectionIndicator: unknown): layoutDirectionIndicator is LayoutDirectionIndicator {
    return typeof layoutDirectionIndicator === "string" && layoutDirectionIndicators.find((value: LayoutDirectionIndicator): boolean => value === layoutDirectionIndicator) !== undefined;
}

function layoutDirection(layoutOptions: LayoutOptions): LayoutDirectionIndicator {
    const layoutDirection = layoutOptions["elk.direction"];
    if (!isLayoutDirectionIndicator(layoutDirection)) {
        throw new Error("elk.direction is not a valid layout direction indicator");
    }
    return layoutDirection;
}

export function sourcePosition(layoutOptions: LayoutOptions): Position {
    return layoutDirection(layoutOptions) === "DOWN" ? Position.Bottom : Position.Right;
}

export function targetPosition(layoutOptions: LayoutOptions): Position {
    return layoutDirection(layoutOptions) === "DOWN" ? Position.Top : Position.Left;
}
