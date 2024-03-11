import ReactFlow, {Background, Controls, OnConnectStartParams, ReactFlowInstance, useReactFlow} from "reactflow";
import "reactflow/dist/style.css";
import {State} from "../../state/State";
import React, {MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, useCallback, useRef} from "react";
import {useStore} from "../../state/Store";
import {shallow} from "zustand/shallow";
import {nodeTypesMapping} from "../../model/node/nodeTypesMapping";
import {bottomHeight} from "../bottom/Bottom";
import {menuWidth} from "../menu/Menu";
import {edgeTypesMapping} from "../../model/edge/edgeTypesMapping";
import {targetPosition} from "../../state/flow/LayoutDirectionIndicator";
import {layoutOptions} from "../../util";
import {NodeFactory} from "../../model/node/NodeFactory";
import {EdgeFactory} from "../../model/edge/EdgeFactory";
import {isSourceHandleId} from "../../model/edge/SourceHandleId";

const selector = (state: State) => ({
    edges: state.flow.edges,
    layout: state.flow.layout,
    layoutOption: state.flow.layoutOption,
    nextNodeId: state.flow.nextNodeId,
    nodes: state.flow.nodes,
    onConnect: state.flow.onConnect,
    onEdgesChange: state.flow.onEdgesChange,
    onNodesChange: state.flow.onNodesChange,
    setConnectingSource: state.flow.setConnectingSource,
});

const creationNodeHalfHeight = 30;


export default function Flow(): React.JSX.Element {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const connectStartParams = useRef<OnConnectStartParams | null>(null);
    const reactFlow: ReactFlowInstance = useReactFlow();
    const store = useStore(selector, shallow);
    const onConnectStart = useCallback((_: ReactMouseEvent | ReactTouchEvent, onConnectStartParams: OnConnectStartParams): void => {
        connectStartParams.current = onConnectStartParams;
        const handleId: string | null = onConnectStartParams.handleId;
        if (!isSourceHandleId(handleId)) {
            throw Error("HandleId is not a valid sourceHandleId");
        }
        store.setConnectingSource(
            handleId,
            onConnectStartParams.nodeId
        );
    }, [store]);
    const onConnectEnd = useCallback(
        (event: MouseEvent | TouchEvent): void => {
            store.setConnectingSource(null, null);
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
                                    {
                                        x: position.x,
                                        y: position.y - creationNodeHalfHeight
                                    },
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
                snapToGrid={true}
            >
                <Background/>
                <Controls
                    position={"bottom-right"}
                />
            </ReactFlow>
        </div>
    );
}

