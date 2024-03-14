import { ElkExtendedEdge, ElkNode, LayoutOptions } from "elkjs/lib/elk-api";
import { Edge } from "reactflow";

export function applyHVLayout(
    nodes: ElkNode[],
    elkEdgeEdgeMap: Map<ElkExtendedEdge, Edge>,
    layoutOptions: LayoutOptions,
    hvToggle: boolean = true
) {
    const direction = hvToggle ? "DOWN" : "RIGHT";
    for (const node of nodes) {
        if (node.children) {
            node.layoutOptions = {
                // ...layoutOptions,
                "elk.direction": direction
            };
            applyHVLayout(node.children, elkEdgeEdgeMap, layoutOptions, !hvToggle);

            if (direction === "DOWN") {
                if (node.edges) {
                    for (const elkEdge of node.edges) {
                        const edge = elkEdgeEdgeMap.get(elkEdge);
                        if (edge) {
                            edge.sourceHandle = "bottom";
                            edge.targetHandle = "top";
                        }
                    }
                }
            }
        }
    }
}