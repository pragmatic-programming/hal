package com.github.ssmifi.hal.server.transpile.library

import com.github.ssmifi.hal.server.service.DockerContainerExecution
import com.github.ssmifi.hal.server.service.DockerServiceInterface

class PythonToJavaScriptTranspiler(private val dockerService: DockerServiceInterface) : AbstractTranspiler() {
    override fun transpile(input: String): String {
        val execution = DockerContainerExecution(
            dockerService,
            "javascripthon:latest",
            "pj", "-s", input
        )
        return execution.run()
    }

}