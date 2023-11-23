package com.github.ssmifi.hal.server.enpoint.execute

import com.github.ssmifi.hal.server.enpoint.execute.library.ExecutorLibrary
import org.springframework.web.bind.annotation.*


@CrossOrigin(origins = ["http://localhost:3000"], methods = [RequestMethod.POST])
@RestController
class ExecuteController(val executorLibrary: ExecutorLibrary) {

    @PostMapping("/execute/")
    fun execute(@RequestBody executeRequest: ExecuteRequest): String {
        return executorLibrary
            .executor(executeRequest)
            .execute(executeRequest.payload)
    }

}