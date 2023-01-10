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

export default { loadImages, loadOneImage };
