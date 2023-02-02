"use strict";

export let images = {};

export function loadImages(imageArray) {
  return Promise.all(
    imageArray.map((imgFile) => {
      return new Promise((resolve) => {
        let img = new Image();
        img.src = imgFile;

        let pathSplited = imgFile.split("/");

        img.addEventListener("load", () => {
          resolve(img);
          images[pathSplited[pathSplited.length - 1].split(".")[0]] = img;
        });
      });
    })
  );
}

export function loadOneImage(imagePath) {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = imgFile;

    let pathSplited = imagePath.split("/");

    img.addEventListener("load", () => {
      resolve(img);
      images[pathSplited[pathSplited.length - 1].split(".")[0]] = img;
    });
  });
}

export function tintImage(img, color) {
  const buffer = document.createElement("canvas");
  buffer.width = img.width;
  buffer.height = img.height;
  const btx = buffer.getContext("2d");

  // First draw your image to the buffer
  btx.drawImage(img, 0, 0);

  // Now we'll multiply a rectangle of your chosen color
  btx.fillStyle = color;
  btx.globalCompositeOperation = "multiply";
  btx.fillRect(0, 0, buffer.width, buffer.height);

  // Finally, fix masking issues you'll probably incur and optional globalAlpha
  btx.globalAlpha = 0.5;
  btx.globalCompositeOperation = "destination-in";
  btx.drawImage(img, 0, 0);

  return buffer;
}

export default { loadImages, loadOneImage };
