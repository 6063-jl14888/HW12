// serial variables
let mSerial;
let connectButton;
let readyToReceive;

// project variables
let waves = [];
let waveCount = 0;

let waves3 = [];
let wave3Count = 0;

let waves4 = [];
let wave4Count = 0;

let waves5 = [];
let wave5Count = 0;

let waves6 = [];
let wave6Count = 0;

let waves7 = [];
let wave7Count = 0;

let waves8 = [];
let wave8Count = 0;



function receiveSerial() {
  let line = mSerial.readUntil("\n");
  trim(line);
  if (!line) return;

  if (line.charAt(0) != "{") {
    print("error: ", line);
    readyToReceive = true;
    return;
  }

  let data = JSON.parse(line).data;
  let d2 = data.D2;
  let d3 = data.D3;
  let d4 = data.D4;
  let d5 = data.D5;
  let d6 = data.D6;
  let d7 = data.D7;
  let d8 = data.d8;
  print(data);


  if (d2.isPressed) {
    createWave();
  }
  if (d3.isPressed) {
    createWave3();
  }
  if (d4.isPressed) {
    createWave4();
  }
  if (d5.isPressed) {
    createWave5();
  }
  if (d6.isPressed) {
    createWave6();
  }
  if (d7.isPressed) {
    createWave7();
  }
  if (d8.isPressed) {
    createWave8();
  }

  readyToReceive = true;
}

function createWave() {
  let newWave = {
    x: width / 7,
    y: height / 2,
    diameter: map(waveCount % 20, 0, 20, 20, 600),
    strokeColor: color(255),
    strokeWidth: 1,
    lifetime: 255,
  };
  waves.push(newWave);
  waveCount++;
}

function createWave3() {
  let newWave3 = {
    x3: width / 6,
    y3: height / 2,
    diameter3: map(wave3Count % 20, 0, 20, 20, 600),
    strokeColor3: color(255, 0, 0),
    strokeWidth3: 1,
    lifetime3: 255,
  };
  waves3.push(newWave3);
  wave3Count++;
}

function createWave4() {
  let newWave4 = {
    x4: width / 5,
    y4: height / 2,
    diameter4: map(wave4Count % 20, 0, 20, 20, 600),
    strokeColor4: color(255, 107, 0),
    strokeWidth4: 1,
    lifetime4: 255,
  };
  waves4.push(newWave4);
  wave4Count++;
}

function createWave5() {
  let newWave5 = {
    x5: width / 5,
    y5: height / 2,
    diameter5: map(wave5Count % 20, 0, 20, 20, 600),
    strokeColor5: color(255, 255, 0),
    strokeWidth5: 1,
    lifetime5: 255,
  };
  waves5.push(newWave5);
  wave5Count++;
}

function createWave6() {
  let newWave6 = {
    x6: width / 5,
    y6: height / 2,
    diameter6: map(wave6Count % 20, 0, 20, 20, 600),
    strokeColor6: color(0, 255, 0),
    strokeWidth6: 1,
    lifetime6: 255,
  };
  waves6.push(newWave6);
  wave6Count++;
}

function createWave7() {
  let newWave7 = {
    x7: width / 5,
    y7: height / 2,
    diameter7: map(wave7Count % 20, 0, 20, 20, 600),
    strokeColor7: color(0, 255, 255),
    strokeWidth7: 1,
    lifetime7: 255,
  };
  waves7.push(newWave7);
  wave7Count++;
}

function createWave8() {
  let newWave8 = {
    x8: width / 5,
    y8: height / 2,
    diameter8: map(wave8Count % 20, 0, 20, 20, 600),
    strokeColor8: color(0, 255, 255),
    strokeWidth8: 1,
    lifetime8: 255,
  };
  waves8.push(newWave8);
  wave8Count++;
}

function connectToSerial() {
  if (!mSerial.opened()) {
    mSerial.open(9600);
    readyToReceive = true;
    connectButton.hide();
  }
}

function setup() {
  // setup project
  createCanvas(windowWidth, windowHeight);

  // setup serial
  readyToReceive = false;
  mSerial = createSerial();
  connectButton = createButton("Connect To Serial");
  connectButton.position(width / 2, height / 2);
  connectButton.mousePressed(connectToSerial);
}

function draw() {
  // project logic
  background(0);

  drawwave();
  drawwave3();
  drawwave4();
  drawwave5();
  drawwave6();
  drawwave7();
  drawwave8();



  // update serial: request new data
  if (mSerial.opened() && readyToReceive) {
    readyToReceive = false;
    mSerial.clear();
    mSerial.write(0xab);
  }

  // update serial: read new data
  if (mSerial.availableBytes() > 8) {
    receiveSerial();
  }
}

function drawwave() {
  for (let i = waves.length - 1; i >= 0; i--) {
    let wave = waves[i];
    noFill();
    stroke(wave.strokeColor, wave.lifetime);
    strokeWeight(wave.strokeWidth);
    ellipse(wave.x, wave.y, wave.diameter, wave.diameter);

    wave.lifetime -= 5;
    if (wave.lifetime <= 0) {
      waves.splice(i, 1);
    }
  }
}

function drawwave3() {
  for (let j = waves3.length - 1; j >= 0; j--) {
    let wave3 = waves3[j];
    noFill();
    stroke(wave3.strokeColor3, wave3.lifetime3);
    strokeWeight(wave3.strokeWidth3);
    ellipse(wave3.x3, wave3.y3, wave3.diameter3, wave3.diameter3);

    wave3.lifetime3 -= 5;
    if (wave3.lifetime3 <= 0) {
      waves3.splice(j, 1);
    }
  }
}

function drawwave4() {
  for (let p = waves4.length - 1; p >= 0; p--) {
    let wave4 = waves4[p];
    noFill();
    stroke(wave4.strokeColor4, wave4.lifetime4);
    strokeWeight(wave4.strokeWidth4);
    ellipse(wave4.x4, wave4.y4, wave4.diameter4, wave4.diameter4);

    wave4.lifetime4 -= 5;
    if (wave4.lifetime4 <= 0) {
      waves4.splice(p, 1);
    }
  }
}


function drawwave5() {
  for (let p = waves5.length - 1; p >= 0; p--) {
    let wave5 = waves5[p];
    noFill();
    stroke(wave5.strokeColor5, wave5.lifetime5);
    strokeWeight(wave5.strokeWidth5);
    ellipse(wave5.x5, wave5.y5, wave5.diameter5, wave4.diameter5);

    wave5.lifetime5 -= 5;
    if (wave5.lifetime5 <= 0) {
      waves5.splice(p, 1);
    }
  }
}

function drawwave6() {
  for (let p = waves6.length - 1; p >= 0; p--) {
    let wave6 = waves6[p];
    noFill();
    stroke(wave6.strokeColor6, wave6.lifetime6);
    strokeWeight(wave6.strokeWidth6);
    ellipse(wave6.x6, wave6.y6, wave6.diameter6, wave6.diameter6);

    wave6.lifetime6 -= 5;
    if (wave6.lifetime6 <= 0) {
      waves6.splice(p, 1);
    }
  }
}

function drawwave7() {
  for (let p = waves7.length - 1; p >= 0; p--) {
    let wave7 = waves7[p];
    noFill();
    stroke(wave7.strokeColor7, wave7.lifetime7);
    strokeWeight(wave7.strokeWidth7);
    ellipse(wave7.x7, wave7.y7, wave7.diameter7, wave7.diameter7);

    wave7.lifetime7 -= 5;
    if (wave7.lifetime7 <= 0) {
      waves7.splice(p, 1);
    }
  }
}

function drawwave8() {
  for (let p = waves8.length - 1; p >= 0; p--) {
    let wave8 = waves8[p];
    noFill();
    stroke(wave8.strokeColor8, wave8.lifetime8);
    strokeWeight(wave8.strokeWidth8);
    ellipse(wave8.x8, wave8.y8, wave8.diameter8, wave8.diameter8);

    wave8.lifetime8 -= 5;
    if (wave8.lifetime8 <= 0) {
      waves8.splice(p, 1);
    }
  }
}


