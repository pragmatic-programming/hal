package com.github.ssmifi.hal.server.enpoint.kico;

import com.github.ssmifi.hal.server.service.OperatingSystemInterface

class KiCoDiaJar(private val operatingSystem: OperatingSystemInterface) {
    fun fileName(): String {
        return "kicodia." + operatingSystem.shortName() + ".jar"
    }
}
