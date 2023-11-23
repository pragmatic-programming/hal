package com.github.ssmifi.hal.server.transpile.library

abstract class AbstractTranspiler {
    abstract fun transpile(input: String):String
}
