import ReactFlow, { Background, Controls, OnConnectStartParams, ReactFlowInstance, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import { State } from "../../../state/State";
import React, { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, useCallback, useRef } from "react";
import { useStore } from "../../../state/Store";
import { shallow } from "zustand/shallow";
import { createNodeCreate } from "../../../model/node/createNode";
import { createEdgeFromOnConnectStartParams } from "../../../model/edge/createEdge";
import { nodeTypesMapping } from "../../../model/node/nodeTypesMapping";
import { bottomHeight } from "../../bottom/Bottom";
import { menuWidth } from "../../menu/Menu";
import { edgeTypesMapping } from "../../../model/edge/edgeTypesMapping";
import { isLayoutDirectionIndicator, targetPosition } from "../../../state/reactFlow/LayoutDirectionIndicator";

const selector = (state: State) => ({
    nodes: state.reactFlow.nodes,
    edges: state.reactFlow.edges,
    onNodesChange: state.reactFlow.onNodesChange,
    onEdgesChange: state.reactFlow.onEdgesChange,
    onConnect: state.reactFlow.onConnect,
    layout: state.reactFlow.layout,
});

const creationNodeHalfHeight = 30;


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
    const nextId = useStore((state: State) => state.reactFlow.nextNodeId);
    const layoutDirection = useStore((state: State) => state.reactFlow.layoutOptions['elk.direction']);
    if (!isLayoutDirectionIndicator(layoutDirection)) {
        throw new Error("elk.direction is not a valid layout direction indicator");
    }
    const setConnectingSourceNodeId = useStore((state: State) => state.reactFlow.setConnectingSourceNodeId);

    const onConnectStart = useCallback((_: ReactMouseEvent | ReactTouchEvent, onConnectStartParams: OnConnectStartParams) => {
        connectStartParams.current = onConnectStartParams;
        setConnectingSourceNodeId(onConnectStartParams.nodeId);
    }, [setConnectingSourceNodeId]);

    const onConnectEnd = useCallback(
        (event: MouseEvent | TouchEvent): void => {
            setConnectingSourceNodeId(null);
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
                            const targetId = nextId();
                            onNodesChange([{
                                type: "add",
                                item: createNodeCreate(
                                    targetId,
                                    position.x,
                                    position.y - creationNodeHalfHeight,
                                    targetPosition(layoutDirection),
                                )
                            }]);
                            onEdgesChange([{
                                type: "add",
                                item: createEdgeFromOnConnectStartParams(connectStartParams.current, targetId)
                            }]);
                        }
                    }
                }
            }
        },
        [
            layoutDirection,
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
                height: "calc(100vh - " + bottomHeight + "px)",
                left: menuWidth,
                position: "fixed",
                top: 0,
                width: "calc(100vw - " + menuWidth + "px)",
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
                onInit={(reactFlowInstance: ReactFlowInstance) => layout(reactFlowInstance.fitView, {"elk.direction": "RIGHT"})}
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

