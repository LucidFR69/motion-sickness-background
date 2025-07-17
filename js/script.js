const canvas = document.getElementById("dotsCanvas");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

let spacing = 40;
let dotSize = 3;
let tail = 0.1;
let speed = 0.05;
let dotColor = "#ffffff";
let bgColor = "#000000";
let rgbMode = false;

let mouse = { x: width / 2, y: height / 2 };
let dots = [];

function createGrid() {
  dots = [];
  const buffer = spacing * 2;
  for (let y = -buffer; y < height + buffer; y += spacing) {
    for (let x = -buffer; x < width + buffer; x += spacing) {
      dots.push({ baseX: x, baseY: y });
    }
  }
}

function updateCanvasSize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  createGrid();
}

window.addEventListener("resize", updateCanvasSize);
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function hexToRGBA(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function animate() {
  ctx.fillStyle = hexToRGBA(bgColor, 1 - tail);
  ctx.fillRect(0, 0, width, height);

  const globalHue = (Date.now() / 20) % 360;

  for (let dot of dots) {
    const offsetX = (width / 2 - mouse.x) * speed;
    const offsetY = (height / 2 - mouse.y) * speed;
    const x = dot.baseX + offsetX;
    const y = dot.baseY + offsetY;

    ctx.beginPath();
    ctx.arc(x, y, dotSize, 0, Math.PI * 2);
    ctx.fillStyle = rgbMode ? `hsl(${globalHue}, 100%, 70%)` : dotColor;
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

function livelyPropertyListener(name, val) {
  switch (name) {
    case "gridSpacing":
      spacing = +val;
      createGrid();
      break;
    case "dotSize":
      dotSize = +val;
      break;
    case "tailLength":
      tail = +val;
      break;
    case "mirrorSpeed":
      speed = +val;
      break;
    case "dotColor":
      dotColor = val;
      break;
    case "backgroundColor":
      bgColor = val;
      break;
    case "rgbMode":
      rgbMode = val;
      break;
  }
}

createGrid();
animate();
