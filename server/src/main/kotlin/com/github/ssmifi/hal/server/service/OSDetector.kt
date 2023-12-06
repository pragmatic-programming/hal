package com.github.ssmifi.hal.server.service

import org.springframework.stereotype.Service

@Service
class OSDetector {
    fun detect(): String {
        return System.getProperty("os.name")
    }

    fun getOSShortName(): String {
        val osName = detect()
        return when {
            osName.contains("win", ignoreCase = true) -> "win"
            osName.contains("mac", ignoreCase = true) -> "osx"
            osName.contains("nux", ignoreCase = true) -> "linux"
            else -> throw RuntimeException("Unknown OS name: $osName")
        }
    }
}
