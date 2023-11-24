package com.github.ssmifi.hal.server.enpoint.transpile.library

import com.github.ssmifi.hal.server.service.DockerServiceInterface
import com.github.ssmifi.hal.server.enpoint.transpile.TranspileRequest
import org.springframework.stereotype.Service


@Service
class TranspilerLibrary(dockerService: DockerServiceInterface) {
    private var transpilerMap: HashMap<String, Map<String, AbstractTranspiler>> = hashMapOf(
        "Python" to hashMapOf(
            "JavaScript" to PythonToJavaScriptTranspiler(dockerService)
        )
    )

    fun transpiler(transpilerRequest: TranspileRequest): AbstractTranspiler {
        // todo Error handling
        return transpilerMap[transpilerRequest.inputLanguage]?.get(transpilerRequest.outputLanguage)!!
    }
}
