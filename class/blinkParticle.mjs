import { playRandomSound } from "../libs/sound.mjs";
import { randomInt } from "../libs/utils.mjs";
import { Particle } from "./particle.mjs";

export class BlinkParticle extends Particle {
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

    this.frameUntilStartBlink = randomInt(4, 8);
    this.frameBetweenBlink = 2;
    this.frameSinceBlink = 0;
    this.blinkOn = true;
  }

  draw(ctx) {
    super.draw(ctx);

    if (this.frameUntilStartBlink > 0) {
      this.frameUntilStartBlink--;
      if (this.image !== undefined) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
      } else {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.position.x, this.position.y, this.size.x, this.size.y);
        ctx.fill();
      }
    } else {
      this.frameSinceBlink++;

      if (this.frameSinceBlink >= this.frameBetweenBlink) {
        this.frameSinceBlink = 0;
        this.blinkOn = !this.blinkOn;
      }

      if (this.blinkOn) {
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
  }
}