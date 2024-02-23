package com.github.ssmifi.hal.server.enpoint.kico

import com.github.ssmifi.hal.server.service.OperatingSystemInterface
import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException
import java.nio.file.Path
import kotlin.io.path.*

class SCChartCode(
    private val operatingSystem: OperatingSystemInterface,
    private val scChartRequest: SCChartRequest,
) {

    private val input: Path = createTempFile(suffix = ".sctx")
    private val output: Path = createTempDirectory()
    private val log: Path = createTempFile(suffix = ".log")

    fun text(): String {
        input.writeText(this.scChartRequest.payload)
        generateCode()
        val code = output.listDirectoryEntries().joinToString { it.readText() }
        deleteFiles()
        return code
    }

    private fun generateCode() {
        val logFile = log.toFile()
        val result = ProcessBuilder(
            "java",
            "-jar",
            "tmp/" + KiCoDiaJar(operatingSystem).fileName(),
            "-s",
            "de.cau.cs.kieler.sccharts.netlist",
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
        output.listDirectoryEntries().forEach { it.deleteIfExists() }
        output.deleteIfExists()
        input.deleteIfExists()
        log.deleteIfExists()
    }
}