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

let loopSound = {};

export function startLoopSound(path) {
  loopSound[path] = new Howl({
    src: [path],
    loop: true,
    autoplay: true,
    volume: 0.4,
  });
}

export function stopLoopSound(path) {
  loopSound[path].stop();
  delete loopSound[path];
}
