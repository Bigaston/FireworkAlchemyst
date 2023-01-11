import { getMousePosition } from "../libs/input.mjs";
import { Vector2 } from "./vector2.mjs";

export class Sprite {
  // Static
  static sprites = [];
  static showDebugHitbox = false;

  static updateSprites() {
    Sprite.sprites.forEach((spr) => spr.update());
  }
  static drawSprites(ctx) {
    Sprite.sprites.sort((sprA, sprB) => sprA.zIndex - sprB.zIndex);
    Sprite.sprites.forEach((spr) => spr.draw(ctx));
  }

  static fromImage(position, img) {
    let spr = new Sprite(position, new Vector2(img.width, img.height));

    spr.img = img;

    return spr;
  }

  // Instance
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.img = undefined;

    this.zIndex = 0;
  }

  add() {
    Sprite.sprites.push(this);
  }

  remove() {
    Sprite.sprites = Sprite.sprites.filter((s) => s != this);
  }

  update() {
    if (
      (this.onMouseEnter !== undefined || this.onMouseLeave !== undefined) &&
      this.size !== undefined
    ) {
      let mousePosition = getMousePosition();

      if (mousePosition === null) {
        if (this.mouseInside) {
          this.mouseInside = false;
          if (this.onMouseLeave !== undefined) this.onMouseLeave();
        }
      } else {
        if (
          mousePosition.x >= this.position.x &&
          mousePosition.x <= this.position.x + this.size.x &&
          mousePosition.y >= this.position.y &&
          mousePosition.y <= this.position.y + this.size.y
        ) {
          if (!this.mouseInside) {
            this.onMouseEnter();
            this.mouseInside = true;
          }
        } else {
          if (this.mouseInside) {
            this.onMouseLeave();
            this.mouseInside = false;
          }
        }
      }
    }
  }

  draw(ctx) {
    if (this.size != undefined && Sprite.showDebugHitbox) {
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.lineWidth = "3px";
      ctx.rect(this.position.x, this.position.y, this.size.x, this.size.y);
      ctx.stroke();
    }

    if (this.img !== undefined) {
      ctx.drawImage(this.img, this.position.x, this.position.y);
    }
  }

  addClickListener(func) {
    document.addEventListener("click", (ev) => {
      if (this.mouseInside) func();
    });
  }

  mouseInside = false;
  onMouseEnter = undefined;
  onMouseLeave = undefined;
}
