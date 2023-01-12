import { getMousePosition, setMouseStyle } from "../libs/input.mjs";
import { Vector2 } from "./vector2.mjs";

export class Sprite {
  // Static
  static sprites = [];
  static showDebugHitbox = false;
  static hoverCursor = "./img/cursor/hand_close.png";
  static classicCursor = "./img/cursor/hand_open.png";

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

  static clearSprites() {
    Sprite.sprites = [];
  }

  // Instance
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.img = undefined;

    this.hoverable = false;
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
      (this.onMouseEnter !== undefined ||
        this.onMouseLeave !== undefined ||
        this.hoverable) &&
      this.size !== undefined
    ) {
      let mousePosition = getMousePosition();

      if (mousePosition === null) {
        if (this.mouseInside) {
          this.mouseInside = false;
          if (this.onMouseLeave !== undefined) this.onMouseLeave();

          if (this.hoverable) {
            setMouseStyle(Sprite.classicCursor, 19, 23);
          }
        }
      } else {
        if (
          mousePosition.x >= this.position.x &&
          mousePosition.x <= this.position.x + this.size.x &&
          mousePosition.y >= this.position.y &&
          mousePosition.y <= this.position.y + this.size.y
        ) {
          if (!this.mouseInside) {
            if (this.onMouseEnter !== undefined) this.onMouseEnter();

            if (this.hoverable) {
              setMouseStyle(Sprite.hoverCursor, 19, 23);
            }

            this.mouseInside = true;
          }
        } else {
          if (this.mouseInside) {
            if (this.onMouseLeave !== undefined) this.onMouseLeave();

            if (this.hoverable) {
              setMouseStyle(Sprite.classicCursor, 19, 23);
            }

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
      let mousePosition = getMousePosition();

      if (mousePosition !== null) {
        if (
          mousePosition.x >= this.position.x &&
          mousePosition.x <= this.position.x + this.size.x &&
          mousePosition.y >= this.position.y &&
          mousePosition.y <= this.position.y + this.size.y
        ) {
          func(this);
        }
      }
    });
  }

  mouseInside = false;
  onMouseEnter = undefined;
  onMouseLeave = undefined;
}
