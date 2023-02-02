import { randomInt } from "./utils";
import { Howl } from "howler";

export function playSound(path: string) {
  new Howl({
    src: [path],
    autoplay: true,
  });
}

export function playRandomSound(path: string[]) {
  new Howl({
    src: [path[randomInt(0, path.length)]],
    autoplay: true,
  });
}

let loopSound: { [key: string]: Howl } = {};

export function startLoopSound(path: string) {
  loopSound[path] = new Howl({
    src: [path],
    loop: true,
    autoplay: true,
    volume: 0.4,
  });
}

export function stopLoopSound(path: string) {
  loopSound[path].stop();
  delete loopSound[path];
}
