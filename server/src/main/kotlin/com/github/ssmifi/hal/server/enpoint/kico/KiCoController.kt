package com.github.ssmifi.hal.server.enpoint.kico

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@CrossOrigin(origins = ["http://localhost:3000"], methods = [RequestMethod.POST])
@RestController
@RequestMapping("/kico")
class KiCoController {

    @PostMapping("/code/")
    fun kico(@RequestBody scChartRequest: SCChartRequest): ResponseEntity<String> {
        val headers = HttpHeaders()
        val body = SCChartCode(scChartRequest).text()
        headers.contentLength = body.length.toLong()
        headers.contentType = MediaType.TEXT_PLAIN
        return ResponseEntity(body, headers, HttpStatus.OK)
    }

    @PostMapping("/diagram/")
    fun diagram(@RequestBody scChartRequest: SCChartRequest): ResponseEntity<Any?> {
        val headers = HttpHeaders()
        val body = SCChartDiagram(scChartRequest).bytes()
        headers.contentLength = body.size.toLong()
        headers.contentType = MediaType.IMAGE_PNG
        return ResponseEntity(body, headers, HttpStatus.OK)
    }

}