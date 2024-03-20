import { Node } from "reactflow";

export interface StrictNode<T> extends Node<T> {
    height: number,
    width: number,
    data: T,
}

export function strictNode<T>(node: Node<T> | undefined): StrictNode<T> {
    if (!node) {
        throw new Error("Node is undefined");
    }
    if (node.height === undefined) {
        throw new Error("Node.height is undefined");
    }
    if (node.width === undefined) {
        throw new Error("Node.width is undefined");
    }
    if (!node.data) {
        throw new Error("Node.data is undefined");
    }
    return node as StrictNode<T>;
}
