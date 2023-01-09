let canvas;

export function initCanvas(c) {
  canvas = c;
}

// Keyboard
let keyDownArray = [];
let keyPressedArray = [];
let keyHoldArray = [];
export function keyDown(key) {
  return keyDownArray.includes(key.toLowerCase());
}

export function keyPressed(key) {
  if (keyPressedArray.includes(key.toLowerCase())) {
    keyHoldArray.push(key.toLowerCase());
    keyPressedArray = keyPressedArray.filter((k) => k != key.toLowerCase());
    return true;
  }

  return false;
}

document.addEventListener("keypress", (ev) => {
  if (!keyDownArray.includes(ev.key.toLowerCase())) {
    keyDownArray.push(ev.key.toLowerCase());
  }

  if (
    !keyPressedArray.includes(ev.key.toLowerCase()) &&
    !keyHoldArray.includes(ev.key.toLowerCase())
  ) {
    keyPressedArray.push(ev.key.toLowerCase());
  }
});

document.addEventListener("keyup", (ev) => {
  keyDownArray = keyDownArray.filter((key) => key != ev.key.toLowerCase());
  keyPressedArray = keyPressedArray.filter(
    (key) => key != ev.key.toLowerCase()
  );
  keyHoldArray = keyHoldArray.filter((key) => key != ev.key.toLowerCase());
});

// Mouse Position
let mousePosition;
export function initMousePosition(can) {
  mousePosition = null;

  can.addEventListener("mousemove", (ev) => {
    let rect = can.getBoundingClientRect();

    let x = Math.trunc(ev.clientX - rect.left);
    let y = Math.trunc(ev.clientY - rect.top);

    mousePosition = { x, y };
  });

  canvas.addEventListener("mouseleave", (ev) => {
    mousePosition = null;
  });
}

export function getMousePosition() {
  if (mousePosition === undefined) {
    throw new Error(
      "Mouse is not initialized. Initialize function first with initMousePosition"
    );
  }

  return mousePosition;
}

export function setMouseStyle(url) {
  if (canvas === undefined) {
    throw new Error(
      "Canvas is not initialized. Initialize function first with initCanvas"
    );
  }

  canvas.style.cursor = `url("${url}") 0 0, default`;
}

export default { keyDown, keyPressed };
