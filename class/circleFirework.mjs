import { playRandomSound } from "../libs/sound.mjs";
import { degrees_to_radians, random, randomInt } from "../libs/utils.mjs";
import { Firework } from "./firework.mjs";
import { Particle } from "./particle.mjs";
import { Vector2 } from "./vector2.mjs";

export class CircleFirework extends Firework {
  constructor(
    position,
    direction,
    directionChange,
    timeBeforeExplosion,
    color,
    typeParticle = Particle
  ) {
    super(
      position,
      direction,
      directionChange,
      timeBeforeExplosion,
      color,
      typeParticle
    );
  }

  detonate() {
    super.remove();

    playRandomSound([
      "./sound/Explosions/Canon-explosion-légère-1.mp3",
      "./sound/Explosions/Canon-explosion-légère-2.mp3",
      "./sound/Explosions/Canon-explosion-lourde-1.mp3",
    ]);
    if (this.typeParticle.playParticleSound !== undefined)
      this.typeParticle.playParticleSound();

    for (let i = 0; i < 360; i = i + 16) {
      let rad = degrees_to_radians(randomInt(i - 5, i + 5));
      let direction = new Vector2(Math.cos(rad), Math.sin(rad));
      direction.x = direction.x * 4;
      direction.y = direction.y * 3;

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

      rad = degrees_to_radians(randomInt(i - 5, i + 5));
      direction = new Vector2(Math.cos(rad), Math.sin(rad));
      direction.x = direction.x * 2.5;
      direction.y = direction.y * 1.2;

      part = new this.typeParticle(
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
}
