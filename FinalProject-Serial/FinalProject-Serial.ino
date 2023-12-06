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



void sendData() {
  StaticJsonDocument<128> resJson;
  JsonObject data = resJson.createNestedObject("data");

  JsonObject D2 = data.createNestedObject("D2");
  JsonObject D3 = data.createNestedObject("D3");
  JsonObject D4 = data.createNestedObject("D4");



  D2["isPressed"] = d2Pressed;
  D2["count"] = d2ClickCount;

  D3["isPressed"] = d3Pressed;
  D3["count"] = d3ClickCount;

  D4["isPressed"] = d4Pressed;
  D4["count"] = d4ClickCount;


  String resTxt = "";
  serializeJson(resJson, resTxt);

  Serial.println(resTxt);
}

void setup() {
  // Serial setup
  Serial.begin(9600);
  while (!Serial) {}
}

void loop() {
  // read pins

  d2Pressed = digitalRead(2);
  d3Pressed = digitalRead(3);
  d4Pressed = digitalRead(4);


  // calculate if d2 was clicked
  if (d2Pressed && !prevD2Pressed) {
    d2ClickCount++;
  }

  prevD2Pressed = d2Pressed;

  // calculate if d3 was clicked
  if (d3Pressed && !prevD3Pressed) {
    d3ClickCount++;
  }

  prevD3Pressed = d3Pressed;

  if (d4Pressed && !prevD4Pressed) {
    d4ClickCount++;
  }

  prevD4Pressed = d4Pressed;


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
