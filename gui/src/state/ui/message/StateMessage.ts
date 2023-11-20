export interface StateMessage {
    content: string | undefined,
    severity: "success",
    setContent: (content: string | undefined) => void,
}
