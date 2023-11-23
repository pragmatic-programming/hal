package com.github.ssmifi.hal.server.service

import com.github.dockerjava.api.async.ResultCallback
import com.github.dockerjava.api.model.Frame

class LogAdapter : ResultCallback.Adapter<Frame>() {
    private val builder: StringBuilder = StringBuilder("")

    override fun onNext(frame: Frame) {
        val message = frame.payload
        builder.append(String(message))
    }

    fun result(): String {
        return builder.toString()
    }
}