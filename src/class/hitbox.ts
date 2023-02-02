import { Container, Sprite } from "pixi.js";
import { CURSOR_CLOSE } from "../libs/const";

export function createHitox(
  posX: number,
  posY: number,
  width: number,
  height: number,
  container: Container
): Sprite {
  let hitbox = new Sprite();

  hitbox.x = posX;
  hitbox.y = posY;
  hitbox.width = width;
  hitbox.height = height;
  hitbox.interactive = true;
  hitbox.cursor = CURSOR_CLOSE;

  container.addChild(hitbox);

  return hitbox;
}
