import { Sprite } from "../class/sprite.mjs";
import { Vector2 } from "../class/vector2.mjs";
import { images } from "../libs/image.mjs";
import { setMouseStyle } from "../libs/input.mjs";

let yellowPowder, redPowder, greenPowder;

let insideBowl = { color: undefined, type: undefined };
let mouseOnColor;

export function initTable(canvas) {
  // COOR + 50, 30
  yellowPowder = new Sprite(new Vector2(155, 339), new Vector2(53, 36));
  redPowder = new Sprite(new Vector2(214, 318), new Vector2(52, 38));
  greenPowder = new Sprite(new Vector2(271, 330), new Vector2(58, 39));

  yellowPowder.add();
  redPowder.add();
  greenPowder.add();

  yellowPowder.onMouseEnter = () => {
    setMouseStyle("./img/cursor/hand_close.png", 19, 23);
    mouseOnColor = "yellow";
  };

  yellowPowder.onMouseLeave = () => {
    setMouseStyle("./img/cursor/hand_open.png", 19, 23);
    mouseOnColor = undefined;
  };

  redPowder.onMouseEnter = () => {
    setMouseStyle("./img/cursor/hand_close.png", 19, 23);
    mouseOnColor = "red";
  };

  redPowder.onMouseLeave = () => {
    setMouseStyle("./img/cursor/hand_open.png", 19, 23);
    mouseOnColor = undefined;
  };

  greenPowder.onMouseEnter = () => {
    setMouseStyle("./img/cursor/hand_close.png", 19, 23);
    mouseOnColor = "green";
  };

  greenPowder.onMouseLeave = () => {
    setMouseStyle("./img/cursor/hand_open.png", 19, 23);
    mouseOnColor = undefined;
  };
}

export function updateTable(canvas) {}

export function drawTable(ctx, canvas) {
  ctx.drawImage(images.table, canvas.width / 2 - images.table.width / 2, 230);

  let bowlY = 35 + Math.cos(Date.now() / 400) * 8;

  ctx.drawImage(images.Bowl, canvas.width / 2 - images.Bowl.width / 2, bowlY);

  switch (insideBowl.color) {
    case "green":
      ctx.drawImage(
        images.Green_Powder,
        canvas.width / 2 - images.Bowl.width / 2,
        bowlY
      );
      break;

    case "red":
      ctx.drawImage(
        images.Red_Powder,
        canvas.width / 2 - images.Bowl.width / 2,
        bowlY
      );
      break;

    case "yellow":
      ctx.drawImage(
        images.Yellow_Powder,
        canvas.width / 2 - images.Bowl.width / 2,
        bowlY
      );
      break;
  }

  Sprite.updateSprites();
  Sprite.drawSprites(ctx);
}

document.addEventListener("click", (ev) => {
  if (mouseOnColor !== undefined) insideBowl.color = mouseOnColor;

  console.log(insideBowl);
});
