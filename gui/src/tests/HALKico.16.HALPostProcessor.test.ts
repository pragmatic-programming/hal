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
import { testGraphDemo01 } from "./DemoGraphs";
import { HALGraphProcessor } from "../processor/HALGraphProcessor";
import { loadDefaultTransformationConfiguration } from "../processor/HALFactory";

test("HALGraphPRocessorTestGraph01", () => {
    const ihGraph = testGraphDemo01();
    loadDefaultTransformationConfiguration(ihGraph);

    const context = kico.createCompilationContextFromProcessors(ihGraph, HALGraphProcessor);
    context.compile();

    expect(context).toBeDefined();
    // expect(context.getResult()).toBeDefined();

    // const compilationResult = (context.getResult() as ihgraph.IHGraph).getSourceNodes()[0].getContent();
    // const expectedResult = "const int LED_PIN = 13;\\npinMode(LED_PIN, OUTPUT);\\ndigitalWrite(LED_PIN, HIGH);\\ndelay(1000);\\ndigitalWrite(LED_PIN, LOW);\\ndelay(1000);";
    // expect(compilationResult).toBe(expectedResult);
})
