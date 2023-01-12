import { playRandomSound } from "../libs/sound.mjs";
import { Particle } from "./particle.mjs";
import { TrailEffectParticle } from "./trailEffectParticle.mjs";

export class TrailParticle extends Particle {
  static playParticleSound = () => {
    playRandomSound([
      "./sound/Crepitements/Chandelle-crépitement-long-léger-1.mp3",
      "./sound/Crepitements/Chandelle-crépitement-long-léger-2.mp3",
      "./sound/Crepitements/Chandelle-crépitement-lourd-1.mp3",
      "./sound/Crepitements/Chandelle-crépitement-lourd-2.mp3",
      "./sound/Crepitements/Chandelle-crépitement-short-léger-1.mp3",
      "./sound/Crepitements/Chandelle-crépitement-short-léger-2.mp3",
    ]);
  };

  constructor(
    position,
    color,
    size,
    direction,
    directionChange,
    lifetime,
    image
  ) {
    super(position, color, size, direction, directionChange, lifetime, image);

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

    if (this.image !== undefined) {
      ctx.drawImage(this.image, this.position.x, this.position.y);
    } else {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.rect(this.position.x, this.position.y, this.size.x, this.size.y);
      ctx.fill();
    }
  }
}
