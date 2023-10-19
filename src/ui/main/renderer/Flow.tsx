import ReactFlow, { Background, Controls, Edge, Node, Panel, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import ELK, { ElkExtendedEdge, ElkNode } from "elkjs/lib/elk-api";
import { State } from "../../../State";
import React, { useCallback, useMemo } from "react";
import EditorNode from "./EditorNode";
import { gui } from "../../../constants";
import { useStore } from "../../../Store";
import { shallow } from "zustand/shallow";


const selector = (state: State) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

const elk = new ELK({
    workerFactory: function (url) { // the value of 'url' is irrelevant here
        const {Worker} = require("elkjs/lib/elk-worker.js"); // non-minified
        return new Worker(url);
    }
});

const useLayoutedElements = () => {
    const {getNodes, setNodes, getNode, getEdges, fitView,} = useReactFlow();
    const defaultOptions = {
        "elk.algorithm": "layered",
        "elk.layered.spacing.nodeNodeBetweenLayers": 100,
        "elk.spacing.nodeNode": 80,
    };

    const getLayoutedElements = useCallback((options: any) => {
        const layoutOptions = {...defaultOptions, ...options};
        let nodes: Node[] = getNodes();
        let edges: Edge[] = getEdges();

        const graph: ElkNode = {
            id: "root",
            layoutOptions: layoutOptions,
            children: nodes.map((node: Node): ElkNode => ({
                id: node.id,
                width: node.width ? node.width : 100,
                height: node.height ? node.height : 100,
            })),
            edges: edges.map((edge: Edge): ElkExtendedEdge => ({
                id: edge.id,
                sources: [edge.source],
                targets: [edge.target]
            })),
        };

        const changesNodes: Node[] = [];

        elk.layout(graph).then((elkNode: ElkNode) => {
            // By mutating the children in-place we saves ourselves from creating a
            // needless copy of the nodes array.
            if (!elkNode.children) {
                throw new Error("Children are undefined");
            }
            elkNode.children.forEach((child: ElkNode) => {
                const node = getNode(child.id);
                if (!node) {
                    throw new Error("Node is undefined");
                }
                node.position = {x: child.x ? child.x : 0, y: child.y ? child.y : 0};
                changesNodes.push(node);
            });

            setNodes(changesNodes);
            window.requestAnimationFrame(() => {
                fitView();
            });
        });
    }, []);

    return {getLayoutedElements};
};


export default function Flow(): React.JSX.Element {
    const nodeTypes = useMemo(() => ({editorNode: EditorNode}), []);
    const {nodes, edges, onNodesChange, onEdgesChange, onConnect} = useStore(selector, shallow);
    const {getLayoutedElements} = useLayoutedElements();

    return (
        <div
            style={{
                height: "calc(100vh - " + gui.bottomHeight + "px)",
                width: "calc(100vw - " + gui.menuWidth + "px)",
            }}
        >
            <ReactFlow
                edges={edges}
                nodeTypes={nodeTypes}
                nodes={nodes}
                onConnect={onConnect}
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChange}
            >
                <Panel position="top-right">
                    <button
                        onClick={() =>
                            getLayoutedElements({"elk.algorithm": "layered", "elk.direction": "DOWN"})
                        }
                    >
                        vertical layout
                    </button>
                    <button
                        onClick={() =>
                            getLayoutedElements({"elk.algorithm": "layered", "elk.direction": "RIGHT"})
                        }
                    >
                        horizontal layout
                    </button>
                    <button
                        onClick={() =>
                            getLayoutedElements({
                                "elk.algorithm": "org.eclipse.elk.radial",
                            })
                        }
                    >
                        radial layout
                    </button>
                    <button
                        onClick={() =>
                            getLayoutedElements({
                                "elk.algorithm": "org.eclipse.elk.force",
                            })
                        }
                    >
                        force layout
                    </button>
                </Panel>
                <Background/>
                <Controls
                    position={"bottom-right"}
                />
            </ReactFlow>
        </div>
    );
}

