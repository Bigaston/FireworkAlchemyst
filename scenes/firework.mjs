import { CircleFirework } from "../class/circleFirework.mjs";
import { Firework } from "../class/firework.mjs";
import { Particle } from "../class/particle.mjs";
import { Vector2 } from "../class/vector2.mjs";
import { VerticalFirework } from "../class/verticalFirework.mjs";
import { keyPressed, setMouseStyle } from "../libs/input.mjs";
import { random } from "../libs/utils.mjs";
import { Sprite } from "../class/sprite.mjs";
import { images } from "../libs/image.mjs";
import { changeScene } from "../game.mjs";
import { initTable } from "./table.mjs";
import { BlinkParticle } from "../class/blinkParticle.mjs";

let fireworkType = { color: undefined, type: undefined };

let colorTable = {
  red: "#d85d41",
  blue: "#5ce4be",
  yellow: "#fecd4a",
};

let backCursor;

export function initFirework(canvas, firework) {
  setMouseStyle("./img/cursor/hand_open.png", 19, 23);

  fireworkType = firework;
  backCursor = Sprite.fromImage(new Vector2(20, 20), images.back_cursor);

  backCursor.add();
  backCursor.hoverable = true;

  backCursor.addClickListener(() => {
    Sprite.clearSprites();
    initTable(canvas);
    changeScene("table");
  });
}

export function updateFirework(canvas) {
  if (keyPressed(" ")) {
    switch (fireworkType.type) {
      case "circle":
        new CircleFirework(
          new Vector2(random(200, 400), canvas.height),
          new Vector2(random(-10, 10), random(-15, -12)),
          new Vector2(0, 0.3),
          random(30, 50),
          colorTable[fireworkType.color],
          Particle
        ).add();
        break;
      case "normal":
        new Firework(
          new Vector2(random(200, 400), canvas.height),
          new Vector2(random(-10, 10), random(-15, -12)),
          new Vector2(0, 0.3),
          random(30, 50),
          colorTable[fireworkType.color],
          Particle
        ).add();
        break;
      case "vertical":
        new VerticalFirework(
          new Vector2(random(200, 400), canvas.height),
          new Vector2(random(-10, 10), random(-15, -12)),
          new Vector2(0, 0.3),
          random(30, 50),
          colorTable[fireworkType.color],
          Particle
        ).add();
        break;
    }
  }

  // if (keyDown(" ")) {
  //   let typeFirework = randomInt(0, 5);
  //   switch (typeFirework) {
  //     case 0:
  //       new Firework(
  //         new Vector2(random(200, 400), canvas.height),
  //         new Vector2(random(-10, 10), random(-10, -8)),
  //         new Vector2(0, 0.3),
  //         random(25, 40),
  //         Particle
  //       ).add();
  //       break;
  //     case 1:
  //       new Firework(
  //         new Vector2(random(200, 400), canvas.height),
  //         new Vector2(random(-10, 10), random(-10, -8)),
  //         new Vector2(0, 0.3),
  //         random(25, 40),
  //         TrailParticle
  //       ).add();
  //       break;
  //     case 2:
  //       new VerticalFirework(
  //         new Vector2(random(200, 400), canvas.height),
  //         new Vector2(random(-10, 10), random(-10, -8)),
  //         new Vector2(0, 0.3),
  //         random(25, 40),
  //         Particle
  //       ).add();
  //       break;
  //     case 3:
  //       new VerticalFirework(
  //         new Vector2(random(200, 400), canvas.height),
  //         new Vector2(random(-10, 10), random(-10, -8)),
  //         new Vector2(0, 0.3),
  //         random(25, 40),
  //         TrailParticle
  //       ).add();
  //       break;
  //     case 4:
  //       new CircleFirework(
  //         new Vector2(random(200, 400), canvas.height),
  //         new Vector2(random(-10, 10), random(-10, -8)),
  //         new Vector2(0, 0.3),
  //         random(25, 40),
  //         TrailParticle
  //       ).add();
  //       break;
  //   }
  // }
}

export function drawFirework(ctx, canvas) {
  backCursor.position.y = 20 + Math.cos(Date.now() / 400) * 8;

  Sprite.updateSprites();
  Sprite.drawSprites(ctx);
}
