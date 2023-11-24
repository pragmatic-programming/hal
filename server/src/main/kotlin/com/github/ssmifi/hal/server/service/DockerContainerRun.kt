package com.github.ssmifi.hal.server.service

class DockerContainerRun(
    private val dockerService: DockerServiceInterface,
    private val image: String,
    private vararg val cmd: String,
) {

    fun run(): String {
        val id = createContainer()
        startContainer(id)
        val logAdapter = attachLogger(id)
        stopContainer(id)
        removeContainer(id)
        return logAdapter.result()
    }


    private fun createContainer(): String = dockerService
        .docker()
        .createContainerCmd(this.image)
        .withCmd(*this.cmd)
        .exec()
        .id

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
