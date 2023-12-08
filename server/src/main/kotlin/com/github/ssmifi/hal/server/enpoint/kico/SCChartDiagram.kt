package com.github.ssmifi.hal.server.enpoint.kico

import com.github.ssmifi.hal.server.service.OperatingSystemInterface
import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException
import java.nio.file.Path
import kotlin.io.path.*

class SCChartDiagram(
    private val operatingSystem: OperatingSystemInterface,
    private val scChartRequest: SCChartRequest,
) {

    private val input: Path = createTempFile(suffix = ".sctx")
    private val output: Path = createTempFile(suffix = ".png")
    private val log: Path = createTempFile(suffix = ".log")

    fun bytes(): ByteArray {
        input.writeText(this.scChartRequest.payload)
        generateSCChart()
        val output = output.readBytes()
        deleteFiles()
        return output
    }

    private fun generateSCChart() {
        val logFile = log.toFile()
        val result = ProcessBuilder(
            "java",
            "-jar",
            "tmp/" + KiCoDiaJar(operatingSystem).fileName(),
            "-d",
            "--only-diagram",
            "-o=${output.absolutePathString()}",
            input.absolutePathString()
        )
            .redirectOutput(logFile)
            .redirectError(logFile)
            .start()
            .waitFor()
        if (result != 0) {
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, logFile.readText())
        }
    }

    private fun deleteFiles() {
        output.deleteIfExists()
        input.deleteIfExists()
        log.deleteIfExists()
    }
}