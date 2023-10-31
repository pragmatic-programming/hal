import ReactFlow, { Background, Controls, OnConnectStartParams, ReactFlowInstance, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import { State } from "../../../state/State";
import React, { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, useCallback, useRef } from "react";
import { useStore } from "../../../state/Store";
import { shallow } from "zustand/shallow";
import { createCreationNode } from "../../../model/createNode";
import nextNodeId from "../../../state/nextNodeId";
import { createEdgeFromOnConnectStartParams } from "../../../model/createEdge";
import { edgeTypesMapping } from "./EdgeTypes";
import { nodeTypesMapping } from "./NodeTypes";
import { gui } from "../../../constants";

const selector = (state: State) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    layout: state.layout,
});

export const creationNodeHalfHeight = 30;

export default function Flow(): React.JSX.Element {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const connectStartParams = useRef<OnConnectStartParams | null>(null);
    const {project} = useReactFlow();
    const {
        layout,
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect
    } = useStore(selector, shallow);
    const nextId = useStore((state: State) => nextNodeId(state));
    const setConnectingSourceNodeId = useStore((state: State) => state.setConnectingSourceNodeId);

    const onConnectStart = useCallback((_: ReactMouseEvent | ReactTouchEvent, onConnectStartParams: OnConnectStartParams) => {
        connectStartParams.current = onConnectStartParams;
        setConnectingSourceNodeId(onConnectStartParams.nodeId);
    }, [setConnectingSourceNodeId]);

    const onConnectEnd = useCallback(
        (event: MouseEvent | TouchEvent): void => {
            setConnectingSourceNodeId(null)
            if (event instanceof MouseEvent) {
                if (event.target instanceof HTMLElement) {
                    const targetIsPane = event.target.classList.contains("react-flow__pane");
                    if (targetIsPane) {
                        const current = reactFlowWrapper.current;
                        if (!current) {
                            throw new Error("Current is null");
                        }
                        const boundingClientRect: DOMRect = current.getBoundingClientRect();
                        const position = project({
                            x: event.clientX - boundingClientRect.left,
                            y: event.clientY - boundingClientRect.top
                        });
                        if (!connectStartParams.current) {
                            throw new Error("ConnectingNodeId.current is null");
                        }
                        if (connectStartParams.current?.handleType === "source") {
                            onNodesChange([{
                                type: "add",
                                item: createCreationNode(nextId, position.x, position.y - creationNodeHalfHeight)
                            }]);
                            onEdgesChange([{
                                type: "add",
                                item: createEdgeFromOnConnectStartParams(connectStartParams.current, nextId)
                            }]);
                        }
                    }
                }
            }
        },
        [
            nextId,
            onEdgesChange,
            onNodesChange,
            project,
            setConnectingSourceNodeId
        ]
    );

    return (
        <div
            className="wrapper"
            ref={reactFlowWrapper}
            style={{
                left: gui.menuWidth,
                position: "fixed",
                top: 0,
                height: "calc(100vh - " + gui.bottomHeight + "px)",
                width: "calc(100vw - " + gui.menuWidth + "px)",
            }}
        >
            <ReactFlow
                connectionRadius={0}
                edgeTypes={edgeTypesMapping}
                edges={edges}
                nodeTypes={nodeTypesMapping}
                nodes={nodes}
                onConnect={onConnect}
                onConnectEnd={onConnectEnd}
                onConnectStart={onConnectStart}
                onEdgesChange={onEdgesChange}
                onInit={(reactFlowInstance: ReactFlowInstance) => layout(reactFlowInstance.getNode, reactFlowInstance.fitView, {})}
                onNodesChange={onNodesChange}
            >
                <Background/>
                <Controls
                    position={"bottom-right"}
                />
            </ReactFlow>
        </div>
    );
}
