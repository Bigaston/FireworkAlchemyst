import { images, tintImage } from "../libs/image.mjs";
import { playRandomSound, playSound } from "../libs/sound.mjs";
import { degrees_to_radians, lerp, random, randomInt } from "../libs/utils.mjs";
import { Firework } from "./firework.mjs";
import { Particle } from "./particle.mjs";
import { Sprite } from "./sprite.mjs";
import { Vector2 } from "./vector2.mjs";

export class BengalFirework extends Firework {
  constructor(
    position,
    direction,
    directionChange,
    timeBeforeExplosion,
    color,
    typeParticle = Particle
  ) {
    super(position);

    this.direction = direction;
    this.directionChange = directionChange;
    this.timeBeforeExplosion = timeBeforeExplosion;

    this.color = color;

    this.typeParticle = typeParticle;

    this.particleImgs = [1, 2, 3].map((num) => {
      return tintImage(images["Firework_0" + num], color);
    });

    this.frameSinceBlew = 0;
    this.frameBetweenBlew = 2;
    this.frameBeteenSound = 10;
    this.frameSinceSound = 0;
  }

  detonate() {
    super.remove();
  }

  update() {
    console.log("YES");
    this.timeBeforeExplosion--;
    this.frameSinceBlew++;
    this.frameSinceSound++;

    if (this.frameSinceSound >= this.frameBeteenSound) {
      playRandomSound([
        "./sound/Crepitements/Chandelle-crépitement-long-léger-1.mp3",
        "./sound/Crepitements/Chandelle-crépitement-long-léger-2.mp3",
        "./sound/Crepitements/Chandelle-crépitement-lourd-1.mp3",
        "./sound/Crepitements/Chandelle-crépitement-lourd-2.mp3",
        "./sound/Crepitements/Chandelle-crépitement-short-léger-1.mp3",
        "./sound/Crepitements/Chandelle-crépitement-short-léger-2.mp3",
      ]);
    }

    if (this.frameSinceBlew >= this.frameBetweenBlew) {
      this.frameSinceBlew = 0;

      console.log("SUMMON");

      for (let i = 20; i < 160; i = i + 8) {
        let rad = -degrees_to_radians(randomInt(i - 5, i + 5));
        let direction = new Vector2(Math.cos(rad), Math.sin(rad));
        direction.x = direction.x * random(3, 4);
        direction.y = direction.y * random(5, 7);

        let part = new this.typeParticle(
          this.position.copy(),
          this.color,
          new Vector2(2, 2),
          direction,
          direction.x < 0
            ? new Vector2(0.1, 0.2)
            : direction.x > 0
            ? new Vector2(-0.1, 0.2)
            : new Vector2(0, 0.2),
          random(20, 35),
          this.particleImgs[randomInt(0, 3)]
        );
        part.add();
      }
    }

    if (this.timeBeforeExplosion <= 0) {
      this.detonate();
    }
  }
}
