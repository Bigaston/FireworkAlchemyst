import "./style.css";
import * as PIXI from "pixi.js";
import { initTable } from "./scenes/table";

type SCENE = "table" | "firework";
let scene: SCENE = "table";

export const app = new PIXI.Application({
  background: "#000000",
  width: 650,
  height: 500,
});

// Init

initTable();

// Update
app.ticker.add((delta) => {});

// Add the view to the page
let divContainer = document.getElementById("container") as HTMLDivElement;
divContainer.appendChild(app.view as unknown as Node);
