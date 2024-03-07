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

import { IHGraph } from "@pragmatic-programming/ihgraph";
import { createCompilationContextFromProcessors } from "@pragmatic-programming/kico";
import { testGraphSequence } from "./DemoGraphs";
import { SequenceProcessor } from "../processors/compilationUnits/SequenceProcessor";
import { NextCliquePreProcessor } from "../processors/directors/NextCliquePreProcessor";

test("processSequence", () => {
    const ihGraph = testGraphSequence();

    const clique = ihGraph.getNextClique();

    const context = createCompilationContextFromProcessors(clique, SequenceProcessor);
    (context.processors[0] as SequenceProcessor).addPreProcessor(NextCliquePreProcessor);
    // (context.processors[0] as SequenceProcessor).addPostProcessor(CliqueReplacementPostProcessor);
    context.compile();

    expect(context).toBeDefined();
    expect(context.getResult()).toBeDefined();

    const compilationResult = (context.getResult() as IHGraph).getSimpleNodes()[0].getContent();
    const expectedResult: string = "const int LED_PIN = 13;\n" +
        "pinMode(LED_PIN, OUTPUT);\n" +
        "digitalWrite(LED_PIN, HIGH);\n" +
        "delay(1000);\n" +
        "digitalWrite(LED_PIN, LOW);\n" +
        "delay(1000);\n";

    expect(compilationResult).toBe(expectedResult);
})

test("processSequenceAnnotation", () => {
    const ihGraph = testGraphSequence();

    const node = ihGraph.getSimpleNodes()[0];
    node.createAnnotation("NodeType", "JavaScript");

    const clique = ihGraph.getNextClique();

    const context = createCompilationContextFromProcessors(clique, SequenceProcessor);
    (context.processors[0] as SequenceProcessor).addPreProcessor(NextCliquePreProcessor);
    // (context.processors[0] as SequenceProcessor).addPostProcessor(CliqueReplacementPostProcessor);
    context.compile();

    expect(context).toBeDefined();
    expect(context.getResult()).toBeDefined();

    const compilationNode = (context.getResult() as IHGraph).getSimpleNodes()[0];

    expect(compilationNode).toBeDefined();
    expect(compilationNode.getAnnotationData<string>("NodeType")).toEqual("JavaScript");
})
