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
import { createIHGraphFromJSON, IHGraph, IHGraphFactoryInterface} from "@pragmatic-programming/ihgraph";

export function testGraphSequence(): IHGraph {
    const graph: IHGraphFactoryInterface = {
        nodes: [
            {
                id: "Defines",
                content: "const int LED_PIN = 13;"
            },
            {
                id: "Setup",
                content: "pinMode(LED_PIN, OUTPUT);"
            },
            {
                id: "Loop",
                content: "digitalWrite(LED_PIN, HIGH);\ndelay(1000);\ndigitalWrite(LED_PIN, LOW);\ndelay(1000);"
            }
        ],
        edgeTypes: [
            {
                id: "Sequence",
                priority: 1
            }
        ],
        edges: [
            {
                edgeType: "Sequence",
                sourceNode: "Defines",
                targetNode: "Setup"
            },
            {
                edgeType: "Sequence",
                sourceNode: "Setup",
                targetNode: "Loop"
            }
        ]
    };

    return createIHGraphFromJSON(graph);
}

export function testGraphSequenceExecute(): IHGraph {
    const graph: IHGraphFactoryInterface = {
        nodes: [
            {
                id: "Define",
                content: "var x = 1;"
            },
            {
                id: "Add",
                content: "x + 2"
            },
            {
                id: "Result",
                content: ""
            }
        ],
        edgeTypes: [
            {
                id: "Sequence",
                priority: 8
            },
            {
                id: "Execute",
                priority: 2
            }
        ],
        edges: [
            {
                edgeType: "Sequence",
                sourceNode: "Define",
                targetNode: "Add"
            },
            {
                edgeType: "Execute",
                sourceNode: "Add",
                targetNode: "Result"
            }
        ]
    };

    return createIHGraphFromJSON(graph);
}
