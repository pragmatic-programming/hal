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

import { CliqueProcessor } from "./CliqueProcessor";

export class NextCliquePreProcessor extends CliqueProcessor {

    public getId(): string {
        return "NextCliquePreProcessor";
    }

    public getName(): string {
        return "Next Clique Pre Processor";
    }

    public process() {
        const graph = this.getModel();

        this.setProperty(CliqueProcessor.NEXT_CLIQUE, null);

        if (graph.getDeepEdges().length < 1) {
            return;
        }

        const clique = this.getModel().getNextClique();
        this.setProperty(CliqueProcessor.NEXT_CLIQUE_ORIGIN, clique);
        this.setProperty(CliqueProcessor.NEXT_CLIQUE, clique);
    }
}
