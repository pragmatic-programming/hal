import ReactFlow, { Background, Controls, OnConnectStartParams, ReactFlowInstance, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import { State } from "../../state/State";
import React, { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, useCallback, useRef } from "react";
import { useStore } from "../../state/Store";
import { shallow } from "zustand/shallow";
import { nodeTypesMapping } from "../../model/node/nodeTypesMapping";
import { bottomHeight } from "../bottom/Bottom";
import { menuWidth } from "../menu/Menu";
import { edgeTypesMapping } from "../../model/edge/edgeTypesMapping";
import { targetPosition } from "../../state/flow/LayoutDirectionIndicator";
import { layoutOptions } from "../../util";
import { NodeFactory } from "../../model/node/NodeFactory";
import { EdgeFactory } from "../../model/edge/EdgeFactory";

const selector = (state: State) => ({
    edges: state.reactFlow.edges,
    layout: state.reactFlow.layout,
    layoutOption: state.reactFlow.layoutOption,
    nextNodeId: state.reactFlow.nextNodeId,
    nodes: state.reactFlow.nodes,
    onConnect: state.reactFlow.onConnect,
    onEdgesChange: state.reactFlow.onEdgesChange,
    onNodesChange: state.reactFlow.onNodesChange,
    setConnectingSourceNodeId: state.reactFlow.setConnectingSourceNodeId,
});

const creationNodeHalfHeight = 30;


export default function Flow(): React.JSX.Element {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const connectStartParams = useRef<OnConnectStartParams | null>(null);
    const reactFlow: ReactFlowInstance = useReactFlow();
    const store = useStore(selector, shallow);
    const onConnectStart = useCallback((_: ReactMouseEvent | ReactTouchEvent, onConnectStartParams: OnConnectStartParams) => {
        connectStartParams.current = onConnectStartParams;
        store.setConnectingSourceNodeId(onConnectStartParams.nodeId);
    }, [store]);
    const onConnectEnd = useCallback(
        (event: MouseEvent | TouchEvent): void => {
            store.setConnectingSourceNodeId(null);
            if (event instanceof MouseEvent) {
                if (event.target instanceof HTMLElement) {
                    const targetIsPane = event.target.classList.contains("react-flow__pane");
                    if (targetIsPane) {
                        const current = reactFlowWrapper.current;
                        if (!current) {
                            throw new Error("Current is null");
                        }
                        const boundingClientRect: DOMRect = current.getBoundingClientRect();
                        const position = reactFlow.project({
                            x: event.clientX - boundingClientRect.left,
                            y: event.clientY - boundingClientRect.top
                        });
                        if (!connectStartParams.current) {
                            throw new Error("ConnectingNodeId.current is null");
                        }
                        if (connectStartParams.current?.handleType === "source") {
                            const targetId = store.nextNodeId();
                            store.onNodesChange([{
                                type: "add",
                                item: NodeFactory.nodeCreate(
                                    targetId,
                                    position.x,
                                    position.y - creationNodeHalfHeight,
                                    targetPosition(layoutOptions(store.layoutOption)),
                                )
                            }]);
                            store.onEdgesChange([{
                                type: "add",
                                item: EdgeFactory.fromOnConnectStartParams(connectStartParams.current, targetId)
                            }]);
                        }
                    }
                }
            }
        },
        [
            reactFlow,
            store,
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
                edges={store.edges}
                nodeTypes={nodeTypesMapping}
                nodes={store.nodes}
                onConnect={store.onConnect}
                onConnectEnd={onConnectEnd}
                onConnectStart={onConnectStart}
                onEdgesChange={store.onEdgesChange}
                onInit={(reactFlowInstance: ReactFlowInstance) => store.layout(reactFlowInstance.fitView, store.layoutOption)}
                onNodesChange={store.onNodesChange}
            >
                <Background/>
                <Controls
                    position={"bottom-right"}
                />
            </ReactFlow>
        </div>
    );
}

