package com.github.ssmifi.hal.server.enpoint.transpile.library

abstract class AbstractTranspiler {
    abstract fun transpile(input: String): String
}
