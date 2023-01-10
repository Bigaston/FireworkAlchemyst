import { Particle } from "./particle.mjs";
import { Vector2 } from "./vector2.mjs";

export class TrailEffectParticle extends Particle {
  constructor(position, lifetime) {
    super(
      position,
      "#85929E",
      new Vector2(1, 1),
      new Vector2(0, -0.2),
      new Vector2(0, 0.2),
      lifetime
    );
  }
}
