import { Particle } from "./particle.mjs";
import { TrailEffectParticle } from "./trailEffectParticle.mjs";

export class TrailParticle extends Particle {
  constructor(position, color, size, direction, directionChange, lifetime) {
    super(position, color, size, direction, directionChange, lifetime);

    this.frameUntileSpawn = 0;
    this.frameBetweenSpawn = 0;
    this.trailDuration = 10;
  }

  draw(ctx) {
    super.draw(ctx);

    this.frameUntileSpawn--;
    if (this.frameUntileSpawn <= 0) {
      let particle = new TrailEffectParticle(
        this.position.copy(),
        this.trailDuration
      );
      particle.zIndex = -1;
      particle.add();
      this.frameUntileSpawn = this.frameBetweenSpawn;
    }

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.fill();
  }
}
