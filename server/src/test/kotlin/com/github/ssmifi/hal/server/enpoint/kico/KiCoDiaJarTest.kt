package com.github.ssmifi.hal.server.enpoint.kico

import com.github.ssmifi.hal.server.service.OperatingSystemInterface
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class FakeOperatingSystem : OperatingSystemInterface {
    override fun shortName(): String {
        return "linux"
    }

}

class KiCoDiaJarTest {

    @Test
    fun fileName() {
        //given
        System.setProperty("os.name", "nux")
        val operatingSystem = FakeOperatingSystem()
        val kiCoDiaJar = KiCoDiaJar(operatingSystem)
        //then
        assertEquals(
            "kicodia.linux.jar",
            //when
            kiCoDiaJar.fileName()
        );
    }
}