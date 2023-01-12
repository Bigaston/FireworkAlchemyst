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
import { TrailParticle } from "../class/trailParticle.mjs";
import { playRandomSound } from "../libs/sound.mjs";
import { FireworkEmpty } from "../class/fireworkEmpty.mjs";
import { BengalFirework } from "../class/bengalFirework.mjs";

let fireworkType = { color: undefined, type: undefined, modifier: undefined };

let colorTable = {
  red: "#d85d41",
  blue: "#5ce4be",
  yellow: "#fecd4a",
};

let backCursor;

export function initFirework(canvas, firework) {
  setMouseStyle("./img/cursor/hand_open.png", 19, 23);

  document.addEventListener("click", spawnFirework);

  fireworkType = firework;
  backCursor = Sprite.fromImage(new Vector2(20, 20), images.back_cursor);

  backCursor.add();
  backCursor.hoverable = true;

  backCursor.addClickListener(() => {
    Sprite.clearSprites();
    initTable(canvas);
    changeScene("table");
    document.removeEventListener("click", spawnFirework);
  });
}

export function updateFirework(canvas) {
  if (keyPressed(" ")) {
    spawnFirework();
  }
}

export function drawFirework(ctx, canvas) {
  backCursor.position.y = 20 + Math.cos(Date.now() / 400) * 8;

  Sprite.updateSprites();
  Sprite.drawSprites(ctx);
}

function spawnFirework() {
  let particle;

  switch (fireworkType.modifier) {
    case "trail":
      particle = TrailParticle;
      break;
    case "blink":
      particle = BlinkParticle;
      break;
    default:
      particle = Particle;
      break;
  }

  switch (fireworkType.type) {
    case "circle":
      new CircleFirework(
        new Vector2(random(200, 400), 500),
        new Vector2(random(-10, 10), random(-15, -12)),
        new Vector2(0, 0.3),
        random(30, 50),
        colorTable[fireworkType.color] || "#ffffff",
        particle
      ).add();

      playRandomSound([
        "./sound/Tir/Canon-tir-léger-1.mp3",
        "./sound/Tir/Canon-tir-léger-2.mp3",
        "./sound/Tir/Canon-tir-lourd-1.mp3",
        "./sound/Tir/Canon-tir-lourd-2.mp3",
      ]);

      break;
    case "normal":
      new Firework(
        new Vector2(random(200, 400), 500),
        new Vector2(random(-10, 10), random(-15, -12)),
        new Vector2(0, 0.3),
        random(30, 50),
        colorTable[fireworkType.color] || "#ffffff",
        particle
      ).add();

      playRandomSound([
        "./sound/Tir/Chandelle-tir-1.mp3",
        "./sound/Tir/Chandelle-tir-2.mp3",
        "./sound/Tir/Chandelle-tir-3.mp3",
        "./sound/Tir/Chandelle-tir-4.mp3",
      ]);

      playRandomSound([
        "./sound/Sifflements/Sifflement-chandelle-1.mp3",
        "./sound/Sifflements/Sifflement-chandelle-2.mp3",
        "./sound/Sifflements/Sifflement-chandelle-3.mp3",
        "./sound/Sifflements/Sifflement-chandelle-4.mp3",
        "./sound/Sifflements/Sifflement-chandelle-5.mp3",
        "./sound/Sifflements/Sifflement-chandelle-6.mp3",
      ]);

      break;
    case "vertical":
      new VerticalFirework(
        new Vector2(random(200, 400), 500),
        new Vector2(random(-10, 10), random(-15, -12)),
        new Vector2(0, 0.3),
        random(30, 50),
        colorTable[fireworkType.color] || "#ffffff",
        particle
      ).add();

      playRandomSound([
        "./sound/Tir/Chandelle-tir-1.mp3",
        "./sound/Tir/Chandelle-tir-2.mp3",
        "./sound/Tir/Chandelle-tir-3.mp3",
        "./sound/Tir/Chandelle-tir-4.mp3",
      ]);
      playRandomSound([
        "./sound/Sifflements/Sifflement-chandelle-1.mp3",
        "./sound/Sifflements/Sifflement-chandelle-2.mp3",
        "./sound/Sifflements/Sifflement-chandelle-3.mp3",
        "./sound/Sifflements/Sifflement-chandelle-4.mp3",
        "./sound/Sifflements/Sifflement-chandelle-5.mp3",
        "./sound/Sifflements/Sifflement-chandelle-6.mp3",
      ]);
      break;
    default:
      new BengalFirework(
        new Vector2(random(100, 500), 500),
        new Vector2(0, 0),
        new Vector2(0, 0),
        random(30, 50),
        colorTable[fireworkType.color] || "#ffffff",
        particle
      ).add();
      playRandomSound([
        "./sound/Crepitements/Chandelle-crépitement-long-léger-1.mp3",
        "./sound/Crepitements/Chandelle-crépitement-long-léger-2.mp3",
        "./sound/Crepitements/Chandelle-crépitement-lourd-1.mp3",
        "./sound/Crepitements/Chandelle-crépitement-lourd-2.mp3",
        "./sound/Crepitements/Chandelle-crépitement-short-léger-1.mp3",
        "./sound/Crepitements/Chandelle-crépitement-short-léger-2.mp3",
      ]);
      break;
  }
}
