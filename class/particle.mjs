import { Sprite } from "./sprite.mjs";
import { Vector2 } from "./vector2.mjs";

export class Particle extends Sprite {
  constructor(position, color, size, direction, directionChange, lifetime) {
    super(position);

    this.color = color;
    this.size = size;
    this.direction = direction;
    this.directionChange = directionChange;
    this.lifetime = lifetime;

    this.minDirection = new Vector2(0, -3);
    this.maxDirection = new Vector2(5, 9);
  }

  update() {
    this.lifetime--;

    this.direction.add(this.directionChange);

    if (this.direction.x < this.minDirection.x)
      this.direction.x = this.minDirection.x;
    if (this.direction.y < this.minDirection.y)
      this.direction.y = this.minDirection.y;
    if (this.direction.x > this.maxDirection.x)
      this.direction.x = this.maxDirection.x;
    if (this.direction.y > this.maxDirection.y)
      this.direction.y = this.maxDirection.y;

    this.position.add(this.direction);

    if (this.lifetime <= 0) {
      super.remove();
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.fill();
  }
}
