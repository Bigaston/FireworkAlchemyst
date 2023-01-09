"use strict";

import { Firework } from "./class/firework.mjs";
import { Particle } from "./class/particle.mjs";
import { Sprite } from "./class/sprite.mjs";
import { Vector2 } from "./class/vector2.mjs";
import {
  getMousePosition,
  initCanvas,
  initMousePosition,
  setMouseStyle,
} from "./libs/input.mjs";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

init();

function init() {
  // loadImg().then(() => {
  //   draw();
  // });

  initCanvas(canvas);
  initMousePosition(canvas);

  setMouseStyle("./img/cat.png");

  // let part = new Particle(
  //   new Vector2(50, 50),
  //   "#567412",
  //   new Vector2(10, 10),
  //   new Vector2(5, -5),
  //   new Vector2(-0.1, 0.3),
  //   120
  // );

  // part.add();

  new Firework(
    new Vector2(325, 220),
    new Vector2(0, -10),
    new Vector2(-0.01, 0.3),
    30
  ).add();

  new Firework(
    new Vector2(325, 220),
    new Vector2(-3, -9),
    new Vector2(-0.01, 0.3),
    30
  ).add();

  new Firework(
    new Vector2(325, 220),
    new Vector2(3, -9),
    new Vector2(-0.01, 0.3),
    30
  ).add();

  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  Sprite.updateSprites();
  Sprite.drawSprites(ctx);

  setTimeout(function () {
    requestAnimationFrame(draw);
  }, 1000 / 30);
}

export default {};
