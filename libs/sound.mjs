import { randomInt } from "./utils.mjs";

export function playSound(path) {
  new Howl({
    src: [path],
    autoplay: true,
  });
}

export function playRandomSound(path) {
  new Howl({
    src: [path[randomInt(0, path.length)]],
    autoplay: true,
  });
}
