// serial variables
let mSerial;

let connectButton;

let readyToReceive;

// project variables
let waves = [];
let waveCount = 0;

function receiveSerial() {
  let line = mSerial.readUntil("\n");
  trim(line);
  if (!line) return;

  if (line.charAt(0) != "{") {
    print("error: ", line);
    readyToReceive = true;
    return;
  }

  // get data from Serial string
  let data = JSON.parse(line).data;
  let d2 = data.D2;

  if (d2.isPressed) {
    createWave();
  }

  readyToReceive = true;
}

function createWave() {
  let newWave = {
    x: width / 2,
    y: height / 2,
    diameter: map(waveCount % 20, 0, 20, 20, 600),
    strokeWidth: 1,           
    lifetime: 255,            
  };
  waves.push(newWave);
  waveCount++;
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
  for (let i = waves.length - 1; i >= 0; i--) {
    let wave = waves[i];
    noFill();  
    stroke(255, wave.lifetime);  
    strokeWeight(wave.strokeWidth); 
    ellipse(wave.x, wave.y, wave.diameter, wave.diameter);


    if (wave.lifetime <= 0) {
      waves.splice(i, 1);
    }
  }

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
