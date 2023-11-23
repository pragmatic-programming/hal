package com.github.ssmifi.hal.server.endpoint.kico

import com.github.ssmifi.hal.server.enpoint.kico.SCChartRequest
import io.restassured.RestAssured
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class KiCoControllerTest {

    @LocalServerPort
    private val port: Int? = null
    private val scchart = """
scchart DrBVB {
  input bool hsecond
  input bool btnMid, btnNorth, btnSouth 
  output string display0, display1, display2
  input output int sound = 0
  output int scoreHome = 0, scoreGuest = 0
  
  initial state Start 
  { entry do display0 = "Dr. BVB"
    entry do display1 = "0 : 0"
  }
  if btnMid go to kickoff
  
  state kickoff
  { entry do sound = 1 }
  if 2 hsecond go to play
  
  state play
  if btnNorth go to Goal0
  if btnSouth go to Goal1
    
  state Goal0
  { entry do scoreHome++ 
    entry do sound = 2
  }
  if scoreHome == 5 go to GameOverPrimer
  if btnMid go to kickoff
  
  state Goal1
  { entry do scoreGuest++ 
    entry do sound = 3
  }
  if scoreGuest == 5 go to GameOverPrimer
  if btnMid go to kickoff
  
  state GameOverPrimer
  if 10 hsecond go to GameOverDecider
  
  connector state GameOverDecider
  immediate if scoreHome > scoreGuest go to GameOverDisplayTim
  immediate go to GameOver
  
  state GameOverDisplayTim
  {entry do display0 = "Dr. Tim" }
  immediate go to GameOver 
  
  state GameOver
  { entry do sound = 4 }
  if btnMid go to kickoff
}
        """.trimIndent()

    @BeforeEach
    fun setUp() {
        RestAssured.baseURI = "http://localhost:$port"
    }

    @Test
    fun code() {
        given()
            .contentType(ContentType.JSON)
            .body(SCChartRequest(scchart))
            .`when`()
            .post("/kico/code/")
            .then()
            .statusCode(200)
            .header("Content-Length", "5073")
            .header("Content-Type", "text/plain")
        // todo match body
    }

    @Test
    fun diagram() {
        given()
            .contentType(ContentType.JSON)
            .body(SCChartRequest(scchart))
            .`when`()
            .post("/kico/diagram/")
            .then()
            .statusCode(200)
            .header("Content-Length", "83232")
            .header("Content-Type", "image/png")
        // todo match body
    }
}