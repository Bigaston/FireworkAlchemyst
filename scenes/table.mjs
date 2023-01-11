import { Sprite } from "../class/sprite.mjs";
import { Vector2 } from "../class/vector2.mjs";
import { changeScene } from "../game.mjs";
import { images } from "../libs/image.mjs";
import { setMouseStyle } from "../libs/input.mjs";
import { initFirework } from "./firework.mjs";

let yellowPowder, redPowder, bluePowder;
let lighter, bin;

let insideBowl = { color: undefined, type: undefined };
let mouseOnColor;

export function initTable(canvas) {
  // COOR + 50, 30
  yellowPowder = new Sprite(new Vector2(155, 339), new Vector2(53, 36));
  redPowder = new Sprite(new Vector2(214, 318), new Vector2(52, 38));
  bluePowder = new Sprite(new Vector2(271, 330), new Vector2(58, 39));

  yellowPowder.add();
  redPowder.add();
  bluePowder.add();

  yellowPowder.hoverable = true;
  redPowder.hoverable = true;
  bluePowder.hoverable = true;

  yellowPowder.addClickListener(() => {
    insideBowl.color = "yellow";
  });

  redPowder.addClickListener(() => {
    insideBowl.color = "red";
  });

  bluePowder.addClickListener(() => {
    insideBowl.color = "blue";
  });

  lighter = Sprite.fromImage(
    new Vector2(canvas.width / 4 - images.Lighter.width / 2, 35),
    images.Lighter
  );
  bin = Sprite.fromImage(
    new Vector2((canvas.width / 4) * 3 - images.Bin.width / 2, 55),
    images.Bin
  );

  lighter.hoverable = true;
  bin.hoverable = true;

  lighter.addClickListener(() => {
    if (insideBowl.color !== undefined) {
      goToFirework();
    }
  });

  bin.addClickListener(() => {
    insideBowl = { color: undefined, type: undefined };
  });

  lighter.add();
  bin.add();
}

export function updateTable(canvas) {}

export function drawTable(ctx, canvas) {
  ctx.drawImage(images.table, canvas.width / 2 - images.table.width / 2, 230);

  let bowlY = 35 + Math.cos(Date.now() / 400) * 8;
  let thingY = Math.cos((Date.now() + 200) / 400) * 8;

  lighter.position.y = thingY + 35;
  bin.position.y = thingY + 55;
  ctx.drawImage(images.Bowl, canvas.width / 2 - images.Bowl.width / 2, bowlY);

  switch (insideBowl.color) {
    case "blue":
      ctx.drawImage(
        images.Blue_Powder,
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

function goToFirework() {
  Sprite.clearSprites();
  initFirework(insideBowl);
  changeScene("firework");
}
