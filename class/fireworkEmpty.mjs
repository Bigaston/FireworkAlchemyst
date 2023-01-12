import { playSound } from "../libs/sound.mjs";
import { random, randomInt } from "../libs/utils.mjs";
import { Firework } from "./firework.mjs";
import { Particle } from "./particle.mjs";
import { Vector2 } from "./vector2.mjs";

export class FireworkEmpty extends Firework {
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
  }
}
