const path = require("path");
const fs = require("fs");
const execSync = require("child_process").execSync;

const meta = {
  title: "The Firework Alchemist",
};

console.log("Remove/Make build folder...");
if (!fs.existsSync("./build/")) {
  fs.mkdirSync("./build");
  fs.mkdirSync("./build/windows");
  fs.mkdirSync("./build/windows/res");
  fs.mkdirSync("./build/web");
} else {
  fs.rmSync("./build", { recursive: true });
  fs.mkdirSync("./build");
  fs.mkdirSync("./build/windows");
  fs.mkdirSync("./build/windows/res");
  fs.mkdirSync("./build/web");
}

console.log("Build Windows Game");
execSync("haxe desktop.hxml");

const hlPath = execSync("where.exe hl", { encoding: "utf-8" }).trim();
const hlFolder = path.dirname(hlPath);

console.log("Copy Windows Files to Build");
console.log("-HaskLink");
fs.copyFileSync(
  hlPath,
  path.join(__dirname, "build/windows/", meta.title.replace(/ /g, "_") + ".exe")
);

console.log("-libhl.dll");
fs.copyFileSync(
  path.join(hlFolder, "libhl.dll"),
  path.join(__dirname, "build/windows/libhl.dll")
);

console.log("-game.hl");
fs.copyFileSync(
  path.join(__dirname, "game.hl"),
  path.join(__dirname, "build/windows/hlboot.dat")
);

console.log("-dlls (fmt, sdl, SDL2.dll)");
fs.copyFileSync(
  path.join(hlFolder, "fmt.hdll"),
  path.join(__dirname, "build/windows/fmt.dll")
);

fs.copyFileSync(
  path.join(hlFolder, "sdl.hdll"),
  path.join(__dirname, "build/windows/sdl.hdll")
);

fs.copyFileSync(
  path.join(hlFolder, "SDL2.dll"),
  path.join(__dirname, "build/windows/SDL2.dll")
);

console.log("-Incorporated DLL");
copyDir(
  path.join(__dirname, "build_dll"),
  path.join(__dirname, "build/windows")
);

console.log("-Resources (res folder)");
copyDir(
  path.join(__dirname, "res"),
  path.join(__dirname, "build/windows/res"),
  (file) => {
    return !file.startsWith(".") && !file.includes(".mp3");
  }
);

console.log("-Change Icon");
execSync(
  "rcedit ./build/windows/" +
    meta.title.replace(/ /g, "_") +
    ".exe --set-icon ./icon.ico"
);

function copyDir(origin, dest, filterFunction) {
  let files = fs.readdirSync(origin);

  if (filterFunction) files = files.filter(filterFunction);

  files.forEach((file) => {
    if (fs.lstatSync(path.join(origin, file)).isDirectory()) {
      fs.mkdirSync(path.join(dest, file));
      console.log("-- Create dir " + file);
      copyDir(path.join(origin, file), path.join(dest, file), filterFunction);
    } else {
      fs.copyFileSync(path.join(origin, file), path.join(dest, file));
      console.log("-- Copy " + file);
    }
  });
}

// Web
console.log();
console.log("Web");
console.log("-Build Web");
execSync("haxe web.hxml");

console.log("-Copy index.html");
fs.copyFileSync(
  path.join(__dirname, "index.html"),
  path.join(__dirname, "build/web/index.html")
);

console.log("-Copy icon.ico");
fs.copyFileSync(
  path.join(__dirname, "icon.ico"),
  path.join(__dirname, "build/web/icon.ico")
);

console.log("-Copy game.js");
fs.copyFileSync(
  path.join(__dirname, "game.js"),
  path.join(__dirname, "build/web/game.js")
);
