package com.github.ssmifi.hal.server.endpoint.transpile

import com.github.ssmifi.hal.server.enpoint.transpile.TranspileRequest
import io.restassured.RestAssured
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TranspileControllerTest {

    @LocalServerPort
    private val port: Int? = null

    @BeforeEach
    fun setUp() {
        RestAssured.baseURI = "http://localhost:$port"
    }

    @Test
    fun transpile() {
        given()
            .contentType(ContentType.JSON)
            .body(TranspileRequest("Python", "JavaScript", "print(1);"))
            .`when`()
            .post("/transpile/")
            .then()
            .statusCode(200)
            .header("Content-Type", "text/plain;charset=UTF-8")
            .body(equalTo("console.log(1);\n\n"))
    }

}