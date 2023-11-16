import { Node } from "reactflow";

// todo introduce StrictEdge
export interface StrictNode<T> extends Node<T> {
    height: number,
    width: number,
    data: T,
}

export function strictNode<T>(node: Node<T> | undefined): StrictNode<T> {
    if (!node) {
        throw new Error("Node is undefined");
    }
    if (!node.height) {
        throw new Error("Node.height is undefined");
    }
    if (!node.width) {
        throw new Error("Node.width is undefined");
    }
    if (!node.data) {
        throw new Error("Node.data is undefined");
    }
    return node as StrictNode<T>;
}
