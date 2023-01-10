import { Sprite } from "../class/sprite.mjs";
import { Vector2 } from "../class/vector2.mjs";
import { images } from "../libs/image.mjs";
import { setMouseStyle } from "../libs/input.mjs";

let yellowPowder, redPowder, bluePowder;

export function initTable() {
  // COOR + 50, 30
  yellowPowder = new Sprite(new Vector2(155, 139), new Vector2(53, 36));
  redPowder = new Sprite(new Vector2(214, 118), new Vector2(52, 38));
  bluePowder = new Sprite(new Vector2(271, 130), new Vector2(58, 39));

  yellowPowder.add();
  redPowder.add();
  bluePowder.add();

  yellowPowder.onMouseEnter = () => {
    setMouseStyle("./img/cursor/hand_close.png", 19, 23);
  };

  yellowPowder.onMouseLeave = () => {
    setMouseStyle("./img/cursor/hand_open.png", 19, 23);
  };

  redPowder.onMouseEnter = () => {
    setMouseStyle("./img/cursor/hand_close.png", 19, 23);
  };

  redPowder.onMouseLeave = () => {
    setMouseStyle("./img/cursor/hand_open.png", 19, 23);
  };

  bluePowder.onMouseEnter = () => {
    setMouseStyle("./img/cursor/hand_close.png", 19, 23);
  };

  bluePowder.onMouseLeave = () => {
    setMouseStyle("./img/cursor/hand_open.png", 19, 23);
  };
}

export function updateTable(canvas) {}

export function drawTable(ctx, canvas) {
  ctx.drawImage(images.table, canvas.width / 2 - images.table.width / 2, 30);

  Sprite.updateSprites();
  Sprite.drawSprites(ctx);
}
