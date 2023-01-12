import { Sprite } from "../class/sprite.mjs";
import { Vector2 } from "../class/vector2.mjs";
import { changeScene } from "../game.mjs";
import { images } from "../libs/image.mjs";
import { setMouseStyle } from "../libs/input.mjs";
import { initFirework } from "./firework.mjs";

let yellowPowder, redPowder, bluePowder;
let lighter, bin;
let circleModifier, upModifier, verticalModifier;

let insideBowl = { color: undefined, type: undefined };

let canvas;

export function initTable(can) {
  setMouseStyle("./img/cursor/hand_open.png", 19, 23);

  canvas = can;
  insideBowl = { color: undefined, type: undefined };

  // COOR + 50, 230
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

  // Modifier
  circleModifier = new Sprite(new Vector2(250, 267), new Vector2(25, 24));
  upModifier = new Sprite(new Vector2(291, 254), new Vector2(23, 37));
  verticalModifier = new Sprite(new Vector2(329, 261), new Vector2(22, 30));

  circleModifier.add();
  upModifier.add();
  verticalModifier.add();

  circleModifier.hoverable = true;
  upModifier.hoverable = true;
  verticalModifier.hoverable = true;

  circleModifier.addClickListener(() => {
    insideBowl.type = "circle";
  });

  upModifier.addClickListener(() => {
    insideBowl.type = "normal";
  });

  verticalModifier.addClickListener(() => {
    insideBowl.type = "vertical";
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
    if (insideBowl.color !== undefined && insideBowl.type !== undefined) {
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

  switch (insideBowl.type) {
    case "circle":
      ctx.drawImage(
        images.Round,
        canvas.width / 2 - images.Bowl.width / 2,
        bowlY
      );
      break;

    case "normal":
      ctx.drawImage(
        images.Cone,
        canvas.width / 2 - images.Bowl.width / 2,
        bowlY
      );
      break;

    case "vertical":
      ctx.drawImage(
        images.Spike,
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
  initFirework(canvas, insideBowl);
  changeScene("firework");
}
