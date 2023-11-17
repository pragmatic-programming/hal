package com.github.ssmifi.hal.server.service

import com.github.dockerjava.api.DockerClient

interface DockerServiceInterface {

    fun docker(): DockerClient
}
