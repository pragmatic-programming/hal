package com.github.ssmifi.hal.server.endpoint.execute

import com.github.ssmifi.hal.server.enpoint.execute.ExecuteRequest
import io.restassured.RestAssured
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ExecuteControllerTest {

    @LocalServerPort
    private val port: Int? = null

    @BeforeEach
    fun setUp() {
        RestAssured.baseURI = "http://localhost:$port"
    }

    @Test
    fun execute() {
        val script = """
            x = 1
            if x == 1:
            # indented four spaces
                print("x is 1.")
        """.trimIndent()
        given()
            .contentType(ContentType.JSON)
            .body(ExecuteRequest("Python", script))
            .`when`()
            .post("/execute/")
            .then()
            .statusCode(200)
            .body(equalTo("x is 1.\n"))
    }

}