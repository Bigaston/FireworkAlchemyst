import { images, tintImage } from "../libs/image.mjs";
import { lerp, random, randomInt } from "../libs/utils.mjs";
import { Particle } from "./particle.mjs";
import { Sprite } from "./sprite.mjs";
import { Vector2 } from "./vector2.mjs";

export class Firework extends Sprite {
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

    this.minDirection = new Vector2(-5, -50);
    this.maxDirection = new Vector2(5, 5);
  }

  detonate() {
    super.remove();

    // new Particle(
    //   this.position,
    //   color,
    //   new Vector2(2, 2),
    //   new Vector2(-5, -2),
    //   new Vector2(0.1, 0.2),
    //   30
    // ).add();

    // for (let i = -5; i < 5; i += 0.5) {
    //   for (let j = -5; j < 0; j += 0.5) {
    //     console.log(lerp(5, -5, (i + 5) / 10), -lerp(0, -3, j / 5));
    //     let part = new Particle(
    //       this.position.copy(),
    //       color,
    //       new Vector2(2, 2),
    //       new Vector2(lerp(5, -5, (i + 5) / 10), -lerp(0, -3, j / 5)),
    //       i < 0
    //         ? new Vector2(0.1, 0.2)
    //         : i > 0
    //         ? new Vector2(-0.1, 0.2)
    //         : new Vector2(0, 0.2),
    //       30
    //     );
    //     part.add();
    //   }

    for (let i = 0; i < 50; i++) {
      let xDirection = random(-5, 5);
      let yDirection = random(-7, -3);

      let part = new this.typeParticle(
        this.position.copy(),
        // "#" + Math.floor(Math.random() * 16777215).toString(16),
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

  update() {
    this.timeBeforeExplosion--;

    this.direction.add(this.directionChange);

    if (this.direction.x < this.minDirection.x)
      this.direction.x = this.minDirection.x;
    // if (this.direction.y < this.minDirection.y)
    //   this.direction.y = this.minDirection.y;
    if (this.direction.x > this.maxDirection.x)
      this.direction.x = this.maxDirection.x;
    if (this.direction.y > this.maxDirection.y)
      this.direction.y = this.maxDirection.y;

    this.position.add(this.direction);

    if (this.timeBeforeExplosion <= 0) {
      this.detonate();
    }
  }

  draw(ctx) {
    super.draw();

    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.rect(this.position.x, this.position.y, 3, 3);
    ctx.fill();
  }
}
