/* eslint-disable no-undef, no-unused-vars */

const maxNWaves = 20;
const maxNoiseVariance = 0.15;
const maxYOffsetInrement = 0.005;
const xIncrement = 10;
const xOffsetIncrement = 0.05;

function getContainerDimensions() {
  const container = document.getElementById('sketch-container');
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  return {
    containerWidth,
    containerHeight
  }
}

function setup() {
  const { containerWidth, containerHeight} = getContainerDimensions();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent('sketch-container');
  noStroke();
}

let yOffset = 0.0;

function draw() {
  let lightness = 30;
  const from = color(204, 102, 0);
  const to = color("hsl(210, 25%, 60%)");
  setGradient(0, 0, width, height, to, from, p5);

  for (let i = 0; i <= 5; i++) {
    // We are going to draw a polygon out of the wave points
    fill(color(`hsla(210, 45%, ${lightness}%, 0.5)`));
    beginShape();
    let xOffset = 0;
    // Iterate over horizontal pixels
    for (let x = 0; x <= width + 10; x += 10) {
      let y = map(
        noise(xOffset, yOffset + i),
        0,
        1,
        height / 2.75, // top of highest hill
        height / 2.75 + 100 // bottom of highest hill
      );
      vertex(x, y + i * i * 10);
      xOffset += 0.05;
    }
    yOffset += 0.00025;
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
    lightness -= 5;
  }
}

// This Redraws the Canvas when resized
windowResized = function () {
  const { containerWidth, containerHeight} = getContainerDimensions();
  resizeCanvas(containerWidth, containerHeight);
};

function setGradient(x, y, w, h, c1, c2) {
  push();
  strokeWeight(1.5);
  // Top to bottom gradient
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h / 2, 0, 0.85);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
  pop();
}
