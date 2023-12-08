package com.github.ssmifi.hal.server.service

import org.springframework.stereotype.Service

@Service
class OperatingSystem: OperatingSystemInterface {

   override fun shortName(): String {
        val osName = System.getProperty("os.name")
        return when {
            osName.contains("win", ignoreCase = true) -> "win"
            osName.contains("mac", ignoreCase = true) -> "osx"
            osName.contains("nux", ignoreCase = true) -> "linux"
            else -> throw Exception("Unknown OS name: $osName")
        }
    }
}
