import { images } from "../libs/image.mjs";

export function updateTable(canvas) {}

export function drawTable(ctx, canvas) {
  ctx.drawImage(images.table, canvas.width / 2 - images.table.width / 2, 0);
}
