import { CircleFirework } from "../class/circleFirework.mjs";
import { Firework } from "../class/firework.mjs";
import { Particle } from "../class/particle.mjs";
import { TrailParticle } from "../class/trailParticle.mjs";
import { Vector2 } from "../class/vector2.mjs";
import { VerticalFirework } from "../class/verticalFirework.mjs";
import { keyDown, keyPressed } from "../libs/input.mjs";
import { random, randomInt } from "../libs/utils.mjs";
import { Sprite } from "../class/sprite.mjs";

let fireworkType = { color: undefined, type: undefined };

let colorTable = {
  red: "#d85d41",
  blue: "#5ce4be",
  yellow: "#fecd4a",
};

export function initFirework(firework) {
  fireworkType = firework;
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
  Sprite.updateSprites();
  Sprite.drawSprites(ctx);
}
