/********************************************************************************
 * Copyright (c) 2023 ssm.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { TransformationEdge } from "@pragmatic-programming/ihgraph";
import { Processor, Property } from "@pragmatic-programming/kico";
import { CliqueSelectionProcessor } from "./CliqueSelectionProcessor";
import { CliqueProcessor } from "./CliqueProcessor";

export class HALGraphProcessor extends CliqueProcessor {

    public static readonly HAL_DISCARD_ZERO_PRIORITY: Property<boolean> =
        new Property<boolean>("HAL.discardZeroPriority", () => true);

    public getId(): string {
        return "HALGraphProcessor";
    }

    public getName(): string {
        return "HAL Graph";
    }

    public process() {
        if (this.getProperty(HALGraphProcessor.HAL_DISCARD_ZERO_PRIORITY)) {
            this.removeZeroPriorityNodes();
        }

        this.addPostProcessor(CliqueSelectionProcessor as typeof Processor<any, any>);
    }

    protected removeZeroPriorityNodes(): void {
        // Remove all edges with priority less than 1.
        const edges = this.getModel().getDeepEdges().filter((edge) => edge.getType().getPriority() < 1);
        edges.forEach((edge) => {
            this.removeEdgeAndLooseNode(edge);
        });
    }

    protected removeEdgeAndLooseNode(edge: TransformationEdge): void {
        const graph = this.getModel();

        // todo: delete whole node chains of not connected otherwise
        // if (edge.getType().getTransformationDirection() === TransformationDirection.CONTROLFLOW) {
        //     const targetNode = edge.getTargetNode();
        //     graph.removeNode(targetNode);
        // } else {
        //     const sourceNode = edge.getSourceNode();
        //     graph.removeNode(sourceNode);
        // }

        console.log(graph.toStringDebugGraph());
        
        const sourceNode = edge.getSourceNode();
        const targetNode = edge.getTargetNode();
        graph.removeEdge(edge);

        if (sourceNode.getIncomingEdges().length + sourceNode.getOutgoingEdges().length === 0) {
            graph.removeNode(sourceNode);
        }
        if (targetNode.getIncomingEdges().length + targetNode.getOutgoingEdges().length === 0) {
            graph.removeNode(targetNode);
        }

        console.log(graph.toStringDebugGraph());
    }
}
