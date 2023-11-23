package com.github.ssmifi.hal.server.enpoint.transpile

import com.github.ssmifi.hal.server.enpoint.transpile.library.TranspilerLibrary
import org.springframework.web.bind.annotation.*


@CrossOrigin(origins = ["http://localhost:3000"], methods = [RequestMethod.POST])
@RestController
class TranspileController(val transpilerLibrary: TranspilerLibrary) {

    @PostMapping("/transpile/")
    fun execute(@RequestBody transpileRequest: TranspileRequest): String {
        return transpilerLibrary
            .transpiler(transpileRequest)
            .transpile(transpileRequest.payload)
    }

}