import { Sprite } from "../class/sprite.mjs";
import { Vector2 } from "../class/vector2.mjs";
import { changeScene } from "../game.mjs";
import { images } from "../libs/image.mjs";
import { setMouseStyle } from "../libs/input.mjs";
import {
  playRandomSound,
  playSound,
  startLoopSound,
  stopLoopSound,
} from "../libs/sound.mjs";
import { initFirework } from "./firework.mjs";

let yellowPowder, redPowder, bluePowder;
let lighter, bin;
let circleModifier, upModifier, verticalModifier;
let blinkModifier, trailModifier;
let cat;

let insideBowl = { color: undefined, type: undefined, modifier: undefined };

let canvas;

export function initTable(can) {
  setMouseStyle("./img/cursor/hand_open.png", 19, 23);

  canvas = can;
  insideBowl = { color: undefined, type: undefined, modifier: undefined };

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
    playSound("./sound/Autres/Powder-drop.mp3");
    playSound("./sound/Autres/CeramicBowl-noise.mp3");
  });

  redPowder.addClickListener(() => {
    insideBowl.color = "red";
    playSound("./sound/Autres/CeramicBowl-noise.mp3");

    playSound("./sound/Autres/Powder-drop.mp3");
  });

  bluePowder.addClickListener(() => {
    insideBowl.color = "blue";
    playSound("./sound/Autres/Powder-drop.mp3");
    playSound("./sound/Autres/CeramicBowl-noise.mp3");
  });

  // Type
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
    playRandomSound([
      "./sound/Autres/Glass-intoBowl-1.mp3",
      "./sound/Autres/Glass-intoBowl-2.mp3",
    ]);
    playSound("./sound/Autres/CeramicBowl-noise.mp3");
  });

  upModifier.addClickListener(() => {
    insideBowl.type = "normal";
    playRandomSound([
      "./sound/Autres/Glass-intoBowl-1.mp3",
      "./sound/Autres/Glass-intoBowl-2.mp3",
    ]);
    playSound("./sound/Autres/CeramicBowl-noise.mp3");
  });

  verticalModifier.addClickListener(() => {
    insideBowl.type = "vertical";
    playRandomSound([
      "./sound/Autres/Glass-intoBowl-1.mp3",
      "./sound/Autres/Glass-intoBowl-2.mp3",
    ]);
    playSound("./sound/Autres/CeramicBowl-noise.mp3");
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

  lighter.onMouseEnter = () => {
    playSound("./sound/Briquet/Briquet-ouverture.mp3");
  };

  lighter.addClickListener(() => {
    playSound("./sound/Briquet/Briquet-allumage.mp3");
    goToFirework();
    lighter.mouseInside = false;
  });

  bin.addClickListener(() => {
    insideBowl = { color: undefined, type: undefined, modifier: undefined };
    playSound("./sound/Autres/Poubelle-throw.mp3");
  });

  lighter.add();
  bin.add();

  // Modifier
  blinkModifier = new Sprite(new Vector2(408, 343), new Vector2(71, 43));
  trailModifier = new Sprite(new Vector2(367, 325), new Vector2(28, 32));

  blinkModifier.hoverable = true;
  trailModifier.hoverable = true;

  blinkModifier.addClickListener(() => {
    insideBowl.modifier = "blink";
    playSound("./sound/Autres/M-powder-drop.mp3");
    playSound("./sound/Autres/CeramicBowl-noise.mp3");
  });

  trailModifier.addClickListener(() => {
    insideBowl.modifier = "trail";
    playSound("./sound/Autres/CeramicBowl-noise.mp3");
    playSound("./sound/Autres/M-powder-drop.mp3");
  });

  blinkModifier.add();
  trailModifier.add();

  // Cat
  cat = new Sprite(new Vector2(423, 256), new Vector2(87, 51));

  cat.hoverable = true;

  cat.onMouseEnter = () => {
    startLoopSound("./sound/Autres/Chat/Cat-purr.mp3");
  };

  cat.onMouseLeave = () => {
    stopLoopSound("./sound/Autres/Chat/Cat-purr.mp3");
  };

  cat.addClickListener(() => {
    playRandomSound([
      "./sound/Autres/Chat/Cat-miaou-1.mp3",
      "./sound/Autres/Chat/Cat-miaou-2.mp3",
    ]);
  });

  cat.add();
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

  switch (insideBowl.modifier) {
    case "blink":
      ctx.drawImage(
        images.Bowl_Blink,
        canvas.width / 2 - images.Bowl.width / 2,
        bowlY,
        200,
        151
      );
      break;

    case "trail":
      ctx.drawImage(
        images.Bowl_Trails,
        canvas.width / 2 - images.Bowl.width / 2,
        bowlY,
        200,
        151
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
