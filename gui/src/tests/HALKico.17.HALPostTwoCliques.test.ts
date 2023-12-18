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

import * as kico from "kico";
import { testGraphDemo02 } from "./DemoGraphs";
import { SequenceProcessor } from "../processor/SequenceProcessor";
import { HALGraphProcessor } from "../processor/HALGraphProcessor";
import { EvalProcessor } from "../processor/EvalProcessor";

test("HALGraphPRocessorTestGraph01", () => {
    const graph = testGraphDemo02();
    graph.setTransformationConfigurationById("Sequence", SequenceProcessor);
    graph.setTransformationConfigurationById("Execute", EvalProcessor);

    expect(graph).toBeDefined();

    const context = kico.createCompilationContextFromProcessors(graph, HALGraphProcessor);
    context.compile();

    expect(context).toBeDefined();
    expect(context.getResult()).toBeDefined();

    const compilationResult = context.getResult().getSinkNodes()[0].getContent();
    expect(compilationResult).toBe("3");
})

test("HALGraphPRocessorTestGraph02", () => {
    const graph = testGraphDemo02();
    const eval2 = graph.createSourceNode("Eval 2")
    const executeType = graph.getEdgeTypes()[1];
    graph.createTransformationEdge(executeType, graph.getNodes()[1], eval2);
    graph.setTransformationConfigurationById("Sequence", SequenceProcessor);
    graph.setTransformationConfigurationById("Execute", EvalProcessor);

    expect(graph).toBeDefined();

    const context = kico.createCompilationContextFromProcessors(graph, HALGraphProcessor);
    context.compile();

    expect(context).toBeDefined();
    expect(context.getResult()).toBeDefined();
    expect(context.getResult().getNodes().length).toBe(2);

    const node1Result = context.getResult().getSinkNodes()[0].getContent();
    expect(node1Result).toBe("3");
    const node2Result = context.getResult().getSinkNodes()[1].getContent();
    expect(node2Result).toBe("3");

})
