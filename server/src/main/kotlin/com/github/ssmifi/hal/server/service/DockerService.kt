package com.github.ssmifi.hal.server.service

import com.github.dockerjava.api.DockerClient
import com.github.dockerjava.core.DefaultDockerClientConfig
import com.github.dockerjava.core.DockerClientImpl
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient
import org.springframework.stereotype.Service

@Service
class DockerService : DockerServiceInterface {
    private final var docker: DockerClient

    init {
        val dockerClientConfig = DefaultDockerClientConfig
            .createDefaultConfigBuilder()
            .build()
        this.docker = DockerClientImpl.getInstance(
            dockerClientConfig,
            ApacheDockerHttpClient.Builder()
                .dockerHost(dockerClientConfig.dockerHost)
                .sslConfig(dockerClientConfig.sslConfig)
                .build()
        )
    }

    override fun docker(): DockerClient {
        return this.docker
    }
}