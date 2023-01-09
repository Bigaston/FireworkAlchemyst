import { uuidv4 } from "../libs/utils.mjs";

export class Sprite {
  static sprites = [];
  static updateSprites() {
    Sprite.sprites.forEach((spr) => spr.update());
  }
  static drawSprites(ctx) {
    Sprite.sprites.forEach((spr) => spr.draw(ctx));
  }

  constructor(position) {
    this.position = position;
  }

  add() {
    Sprite.sprites.push(this);
  }

  remove() {
    Sprite.sprites = Sprite.sprites.filter((s) => s != this);
  }

  update() {}
  draw(ctx) {}
}
