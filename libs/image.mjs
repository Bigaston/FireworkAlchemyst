export let images = {};

export function loadImages(imageArray) {
  return Promise.all(
    imageArray.map((imgFile) => {
      return new Promise((resolve) => {
        let img = new Image();
        img.src = imgFile;

        img.addEventListener("load", () => {
          resolve(img);
          images[imgFile.split(".")[0]] = img;
        });
      });
    })
  );
}

export function loadOneImage(imagePath) {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = imgFile;

    img.addEventListener("load", () => {
      resolve(img);
      images[imagePath.split(".")[0]] = img;
    });
  });
}

export default { loadImages, loadOneImage };
