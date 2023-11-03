export interface StateDialogNodeNewOpen {
    nodeId: string,
}

export interface StateDialogNodeNew {
    open: StateDialogNodeNewOpen | undefined;
    dialogOpen: (nodeId: string | undefined) => void,
}
