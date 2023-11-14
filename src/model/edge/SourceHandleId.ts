export type SourceHandleId = "bottom" | "right"

export function isSourceHandleId(sourceHandleId: unknown): sourceHandleId is SourceHandleId {
    return sourceHandleId === "bottom" || sourceHandleId === "right";
}
