"use strict";

import { loadImages } from "./libs/image.mjs";
import {
  initCanvas,
  initMousePosition,
  keyDown,
  setMouseStyle,
} from "./libs/input.mjs";
import { random, randomInt } from "./libs/utils.mjs";
import { drawFirework, updateFirework } from "./scenes/firework.mjs";
import { drawTable, updateTable } from "./scenes/table.mjs";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let scene = "table";

init();

function init() {
  loadImages(["./img/table.png"]).then(() => {
    initCanvas(canvas);
    initMousePosition(canvas);

    setMouseStyle("./img/cursor/hand_open.png");

    draw();
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (scene === "table") {
    updateTable();
    drawTable(ctx, canvas);
  } else if (scene === "firework") {
    updateFirework();
    drawFirework(ctx, canvas);
  }

  setTimeout(function () {
    requestAnimationFrame(draw);
  }, 1000 / 30);
}

export default {};
