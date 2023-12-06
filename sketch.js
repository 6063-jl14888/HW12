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

