#include <ArduinoJson.h>

// project variables

bool d2Pressed = false;
int d2ClickCount = 0;

bool prevD2Pressed = false;

bool d3Pressed = false;
int d3ClickCount = 0;

bool prevD3Pressed = false;

bool d4Pressed = false;
int d4ClickCount = 0;

bool prevD4Pressed = false;

bool d5Pressed = false;
int d5ClickCount = 0;

bool prevD5Pressed = false;

bool d6Pressed = false;
int d6ClickCount = 0;

bool prevD6Pressed = false;

bool d7Pressed = false;
int d7ClickCount = 0;

bool prevD7Pressed = false;

bool d8Pressed = false;
int d8ClickCount = 0;

bool prevD8Pressed = false;






void sendData() {
  StaticJsonDocument<768> resJson;
  JsonObject data = resJson.createNestedObject("data");

  JsonObject D2 = data.createNestedObject("D2");
  JsonObject D3 = data.createNestedObject("D3");
  JsonObject D4 = data.createNestedObject("D4");
  JsonObject D5 = data.createNestedObject("D5");
  JsonObject D6 = data.createNestedObject("D6"); 
  JsonObject D7 = data.createNestedObject("D7"); 
  JsonObject D8 = data.createNestedObject("D8"); 



  D2["isPressed"] = d2Pressed;
  D2["count"] = d2ClickCount;

  D3["isPressed"] = d3Pressed;
  D3["count"] = d3ClickCount;

  D4["isPressed"] = d4Pressed;
  D4["count"] = d4ClickCount;

  D5["isPressed"] = d5Pressed;
  D5["count"] = d5ClickCount;
  
  D6["isPressed"] = d6Pressed;
  D6["count"] = d6ClickCount;

  D7["isPressed"] = d7Pressed;
  D7["count"] = d7ClickCount;

  D8["isPressed"] = d8Pressed;
  D8["count"] = d8ClickCount;

  String resTxt = "";
  serializeJson(resJson, resTxt);

  Serial.println(resTxt);
}

void setup() {
  // Serial setup
  Serial.begin(57600);
  while (!Serial) {}
}

void loop() {
  // read pins

  d2Pressed = digitalRead(2);
  d3Pressed = digitalRead(3);
  d4Pressed = digitalRead(4);
  d5Pressed = digitalRead(5);
  d6Pressed = digitalRead(6);
  d7Pressed = digitalRead(7);
  d8Pressed = digitalRead(8);


  // calculate if d2 was clicked
  if (d2Pressed) {
    d2ClickCount++;
  }

  prevD2Pressed = d2Pressed;

  // calculate if d3 was clicked
  if (d3Pressed) {
    d3ClickCount++;
  }

  prevD3Pressed = d3Pressed;

  if (d4Pressed) {
    d4ClickCount++;
  }

  prevD4Pressed = d4Pressed;

  if (d5Pressed) {
    d5ClickCount++;
  }

  prevD5Pressed = d5Pressed;

  if (d6Pressed) {
    d6ClickCount++;
  }

  prevD6Pressed = d6Pressed;

  if (d7Pressed) {
    d7ClickCount++;
  }

  prevD7Pressed = d7Pressed;

  if (d8Pressed) {
    d8ClickCount++;
  }

  prevD8Pressed = d8Pressed;


// Serial.println(
//   String(d2Pressed) + " " + d3Pressed + " " + d4Pressed + " " + d5Pressed + " " + d6Pressed + " " + d7Pressed + " " + d8Pressed
// );

  // check if there was a request for data, and if so, send new data
  if (Serial.available() > 0) {
    int byteIn = Serial.read();
    if (byteIn == 0xAB) {
      Serial.flush();
      sendData();
    }
  }

  delay(2);
}
