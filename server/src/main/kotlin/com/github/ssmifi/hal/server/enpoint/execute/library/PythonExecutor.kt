package com.github.ssmifi.hal.server.enpoint.execute.library

import com.github.ssmifi.hal.server.service.DockerContainerRun
import com.github.ssmifi.hal.server.service.DockerServiceInterface

class PythonExecutor(private val dockerService: DockerServiceInterface) : AbstractExecutor() {
    override fun execute(input: String): String {
        val execution = DockerContainerRun(
            dockerService,
            "python:3.6",
            "python3", "-c", input
        )
        return execution.run()
    }
}