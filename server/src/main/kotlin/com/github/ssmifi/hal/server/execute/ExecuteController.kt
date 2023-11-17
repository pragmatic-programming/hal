package com.github.ssmifi.hal.server.execute

import com.github.ssmifi.hal.server.service.DockerServiceInterface
import org.springframework.web.bind.annotation.*


@CrossOrigin(origins = ["http://localhost:3000"], methods = [RequestMethod.POST])
@RestController
class ExecuteController(val dockerService: DockerServiceInterface) {

    @PostMapping("/execute/")
    fun execute(@RequestBody executeRequest: ExecuteRequest): String {
        val id = createContainer(executeRequest)
        startContainer(id)
        val logAdapter = attachLogger(id)
        stopContainer(id)
        removeContainer(id)
        return logAdapter.result()
    }

    private fun stopContainer(
        id: String,
    ) {
        dockerService.docker().stopContainerCmd(id).withTimeout(5000)
    }

    private fun removeContainer(
        id: String,
    ) {
        dockerService.docker().removeContainerCmd(id).exec()
    }

    private fun createContainer(
        execute: ExecuteRequest,
    ): String = dockerService
        .docker()
        .createContainerCmd("python:3.6")
        .withCmd("python3", "-c", execute.payload)
        .exec()
        .id

    private fun startContainer(
        id: String,
    ) {
        dockerService.docker().startContainerCmd(id).exec()
    }

    private fun attachLogger(
        id: String,
    ): LogAdapter {
        val logAdapter = LogAdapter()
        dockerService
            .docker()
            .logContainerCmd(id)
            .withStdErr(true)
            .withStdOut(true)
            .withFollowStream(true)
            .withSince(0)
            .exec(logAdapter)
            .awaitCompletion()
        return logAdapter
    }

}