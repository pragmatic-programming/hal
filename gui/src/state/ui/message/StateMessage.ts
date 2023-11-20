export interface StateMessage {
    content: string | undefined,
    severity: "success" | "error",
    setContent: (content: string | undefined) => void,
}
