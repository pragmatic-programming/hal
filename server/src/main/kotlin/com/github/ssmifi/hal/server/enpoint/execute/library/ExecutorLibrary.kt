package com.github.ssmifi.hal.server.enpoint.execute.library

import com.github.ssmifi.hal.server.enpoint.execute.ExecuteRequest
import com.github.ssmifi.hal.server.service.DockerServiceInterface
import org.springframework.stereotype.Service


@Service
class ExecutorLibrary(dockerService: DockerServiceInterface) {
    private var executor: HashMap<String, AbstractExecutor> = hashMapOf(
        "Python" to PythonExecutor(dockerService)
    )

    fun executor(executeRequest: ExecuteRequest): AbstractExecutor {
        // todo Error handling
        return executor[executeRequest.language]!!
    }
}
