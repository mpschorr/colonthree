const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// -- START OF CONFIGURATION --

const text = ":3"; // Text to bounce around with
const font = "Poppins"; // Font to use (Poppins is included)
const textSize = 150; // Size of text

const frameRate = 60; // Frame rate to update & move at
const speed = 5; // Speed of text's movement

const rainbowLightness = 65;
const glowLightness = 30;
const glowSize = 40;

// -- END OF CONFIGURATION --

// Setup text & sizes
ctx.font = `${textSize}px ${font}`;
const size = ctx.measureText(text);

// Setup running values
let frame = 0;
let x = 0;
let y = 0;
let vx = speed;
let vy = speed;

// Update size on start & window resize
function updateSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
}
window.onresize = updateSize;

// Draw frame on the canvas
function draw() {
  // Clear old frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw text
  ctx.font = `${textSize}px ${font}`;
  ctx.fillStyle = `hsl(${frame} 100% ${rainbowLightness}%)`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(text, x, y);

  // Draw shadow
  ctx.shadowColor = `hsl(${frame} 100% ${glowLightness}%)`;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = glowSize;
}

// Update values & draw frame
function tick() {
  // Update frame & change values by delta
  frame++;
  x += vx;
  y += vy;

  // Check for collisions
  if (x + size.actualBoundingBoxRight > canvas.width || x < 0) vx = -vx;
  if (y + size.actualBoundingBoxAscent > canvas.height || y < 0) vy = -vy;

  // Redraw frame
  draw();
}

// Start ticking
updateSize();
setInterval(tick, 1000 / frameRate);
