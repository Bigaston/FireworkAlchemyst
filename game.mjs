"use strict";

import { Sprite } from "./class/sprite.mjs";
import { loadImages } from "./libs/image.mjs";
import {
  initCanvas,
  initMousePosition,
  keyDown,
  setMouseStyle,
} from "./libs/input.mjs";
import { drawFirework, updateFirework } from "./scenes/firework.mjs";
import { drawTable, initTable, updateTable } from "./scenes/table.mjs";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let scene = "table";

export function changeScene(scn) {
  scene = scn;
}

init();

function init() {
  loadImages([
    "./img/table.png",
    "./img/Bowl.png",
    "./img/Cone.png",
    "./img/Blue_Powder.png",
    "./img/Red_Powder.png",
    "./img/Round.png",
    "./img/Spike.png",
    "./img/Yellow_Powder.png",
    "./img/Lighter.png",
    "./img/Bin.png",
    "./img/back_cursor.png",
    "./img/particle/Firework_01.png",
    "./img/particle/Firework_02.png",
    "./img/particle/Firework_03.png",
  ]).then(() => {
    initCanvas(canvas);
    initMousePosition(canvas);

    // Sprite.showDebugHitbox = true;

    setMouseStyle("./img/cursor/hand_open.png", 19, 23);

    initTable(canvas);

    draw();
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (scene === "table") {
    updateTable();
    drawTable(ctx, canvas);
  } else if (scene === "firework") {
    updateFirework(canvas);
    drawFirework(ctx, canvas);
  }

  setTimeout(function () {
    requestAnimationFrame(draw);
  }, 1000 / 30);
}

export default {};
