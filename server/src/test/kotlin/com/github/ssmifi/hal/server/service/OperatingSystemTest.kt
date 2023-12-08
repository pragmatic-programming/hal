package com.github.ssmifi.hal.server.service

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.fail
import org.junit.jupiter.api.Test

class OperatingSystemTest {

    @Test
    fun `shortName returns osx`() {
        //given
        System.setProperty("os.name", "win")
        val operatingSystem = OperatingSystem()
        assertEquals(
            "win",
            //when
            operatingSystem.shortName()
        )
    }

    @Test
    fun `shortName returns win`() {
        //given
        System.setProperty("os.name", "win")
        val operatingSystem = OperatingSystem()
        assertEquals(
            "win",
            //when
            operatingSystem.shortName()
        )
    }

    @Test
    fun `shortName returns linux`() {
        //given
        System.setProperty("os.name", "nux")
        val operatingSystem = OperatingSystem()
        assertEquals(
            "linux",
            //when
            operatingSystem.shortName()
        )
    }

    @Test
    fun `shortName throws Exception`() {
        //given
        System.setProperty("os.name", "bsd")
        val operatingSystem = OperatingSystem()
        try {
            operatingSystem.shortName()
            fail("Expected Exception to be thrown")
        } catch (e: Exception) {
            assertEquals("Unknown OS name: bsd", e.message)
        }
    }
}