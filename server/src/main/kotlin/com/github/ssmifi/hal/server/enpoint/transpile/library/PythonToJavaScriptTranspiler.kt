package com.github.ssmifi.hal.server.enpoint.transpile.library

import com.github.ssmifi.hal.server.service.DockerContainerRun
import com.github.ssmifi.hal.server.service.DockerServiceInterface

class PythonToJavaScriptTranspiler(private val dockerService: DockerServiceInterface) : AbstractTranspiler() {
    override fun transpile(input: String): String {
        val execution = DockerContainerRun(
            dockerService,
            "com.github.com.ssmifi.hal.server.javascripthon:latest",
            "pj", "-s", input
        )
        return execution.run()
    }

}