export type TargetHandleId = "top" | "left"

export function isTargetHandleId(targetHandleId: unknown): targetHandleId is TargetHandleId {
    return targetHandleId === "top" || targetHandleId === "left";
}
