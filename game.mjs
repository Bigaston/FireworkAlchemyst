"use strict";

import { Firework } from "./class/firework.mjs";
import { Sprite } from "./class/sprite.mjs";
import { TrailParticle } from "./class/trailParticle.mjs";
import { Vector2 } from "./class/vector2.mjs";
import { VerticalFirework } from "./class/verticalFirework.mjs";
import { images, loadImages } from "./libs/image.mjs";
import {
  initCanvas,
  initMousePosition,
  keyDown,
  setMouseStyle,
} from "./libs/input.mjs";
import { random } from "./libs/utils.mjs";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

init();

function init() {
  loadImages(["./img/table.png"]).then(() => {
    initCanvas(canvas);
    initMousePosition(canvas);

    setMouseStyle("./img/cursor/hand_open.png");

    draw();
  });

  // setMouseStyle("./img/cat.png");

  // let part = new Particle(
  //   new Vector2(50, 50),
  //   "#567412",
  //   new Vector2(10, 10),
  //   new Vector2(5, -5),
  //   new Vector2(-0.1, 0.3),
  //   120
  // );

  // part.add();

  // new Firework(
  //   new Vector2(325, 220),
  //   new Vector2(0, -10),
  //   new Vector2(-0.01, 0.3),
  //   30
  // ).add();

  // new Firework(
  //   new Vector2(325, 220),
  //   new Vector2(-3, -9),
  //   new Vector2(-0.01, 0.3),
  //   30
  // ).add();

  // new Firework(
  //   new Vector2(325, 220),
  //   new Vector2(3, -9),
  //   new Vector2(-0.01, 0.3),
  //   30
  // ).add();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ctx.drawImage(images.table, 0, 0, canvas.width, canvas.height);

  Sprite.updateSprites();
  Sprite.drawSprites(ctx);

  if (keyDown(" ")) {
    new VerticalFirework(
      new Vector2(random(200, 400), 220),
      new Vector2(random(-10, 10), random(-10, -8)),
      new Vector2(0, 0.3),
      random(25, 40),
      TrailParticle
    ).add();
  }

  setTimeout(function () {
    requestAnimationFrame(draw);
  }, 1000 / 30);
}

export default {};
