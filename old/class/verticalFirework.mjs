import { playSound } from "../libs/sound.mjs";
import { random, randomInt } from "../libs/utils.mjs";
import { Firework } from "./firework.mjs";
import { Particle } from "./particle.mjs";
import { Vector2 } from "./vector2.mjs";

export class VerticalFirework extends Firework {
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

    playSound("./sound/Explosions/Chandelle-explosion-1.mp3");
    if (this.typeParticle.playParticleSound !== undefined)
      this.typeParticle.playParticleSound();

    for (let i = 0; i < 40; i++) {
      let xDirection = random(-2, 2);
      let yDirection = random(-7, -3);

      let part = new this.typeParticle(
        this.position.copy(),
        this.color,
        new Vector2(2, 2),
        new Vector2(xDirection, yDirection),
        xDirection < 0
          ? new Vector2(0.1, 0.2)
          : xDirection > 0
          ? new Vector2(-0.1, 0.2)
          : new Vector2(0, 0.2),
        random(20, 35),
        this.particleImgs[randomInt(0, 3)]
      );
      part.add();
    }
  }
}
