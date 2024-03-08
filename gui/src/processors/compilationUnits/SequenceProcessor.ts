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

import { CliqueProcessor } from "../directors/CliqueProcessor";

export class SequenceProcessor extends CliqueProcessor {

    public getId(): string {
        return "SequenceProcessor";
    }

    public getName(): string {
        return "Sequence";
    }

    public process() {
        const targetGraph = this.createTargetGraph();
        const sourceNode = targetGraph.createSimpleNode("Sequence");
        const cliqueNodes = this.getCliqueNodes();
        let content = "";

        cliqueNodes.forEach(node => {
            content += node.getContent() + "\n";
        });

        sourceNode.setContent(content);
        cliqueNodes[0].cloneAnnotationsTo(sourceNode);
        this.setNewClique(targetGraph);
    }

}
