"use strict";

import {
  getMousePosition,
  initCanvas,
  initMousePosition,
  setMouseStyle,
} from "./libs/input.mjs";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

// loadImg().then(() => {
//   draw();
// });

initCanvas(canvas);
initMousePosition(canvas);

setMouseStyle("./img/cat.png");

draw();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  setTimeout(function () {
    requestAnimationFrame(draw);
  }, 1000 / 30);
}

export default {};
