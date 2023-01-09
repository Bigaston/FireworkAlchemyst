import { Particle } from "./particle.mjs";
import { Sprite } from "./sprite.mjs";
import { Vector2 } from "./vector2.mjs";

export class Firework extends Sprite {
  constructor(position, direction, directionChange, timeBeforeExplosion) {
    super(position);

    this.direction = direction;
    this.directionChange = directionChange;
    this.timeBeforeExplosion = timeBeforeExplosion;

    this.minDirection = new Vector2(-5, -50);
    this.maxDirection = new Vector2(5, 5);
  }

  detonate() {
    super.remove();

    const color = "#FFF176";

    // new Particle(
    //   this.position,
    //   color,
    //   new Vector2(2, 2),
    //   new Vector2(-5, -2),
    //   new Vector2(0.1, 0.2),
    //   30
    // ).add();

    for (let i = -5; i < 5; i += 0.5) {
      for (let j = -5; j < 0; j++) {
        let part = new Particle(
          this.position.copy(),
          color,
          new Vector2(2, 2),
          new Vector2(i, j),
          i < 0
            ? new Vector2(0.1, 0.2)
            : i > 0
            ? new Vector2(-0.1, 0.2)
            : new Vector2(0, 0.2),
          30
        );
        console.log(part);
        part.add();
      }
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
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.rect(this.position.x, this.position.y, 3, 3);
    ctx.fill();
  }
}
