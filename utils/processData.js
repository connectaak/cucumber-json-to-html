const path = require("path");
const { cwd } = require("node:process");
const fs = require("fs").promises;

exports.processData = async (inputPath) => {
  try {
    const stat = await fs.lstat(inputPath);

    if (stat.isDirectory()) {
      // Process all files in the directory
      const files = await fs.readdir(inputPath);
      let data = [];
      for (const file of files) {
        const filePath = path.join(inputPath, file);
        const fileStat = await fs.lstat(filePath);
        if (fileStat.isFile()) {
          const absoluteInputPath = path.resolve(cwd(), filePath);
          const singleItem = await fs.readFile(absoluteInputPath, "utf8");
          const parsedPath = path.parse(absoluteInputPath);
          const fileName = parsedPath.name;
          const parseData = JSON.parse(singleItem);
          const newData = { name: fileName, data: parseData };
          data.push(newData);
        }
      }
      return data;
    } else if (stat.isFile()) {
      // Process the single file
      const absoluteInputPath = path.resolve(cwd(), inputPath);
      const data = await fs.readFile(absoluteInputPath, "utf8");
      const parseData = JSON.parse(data);
      const parsedPath = path.parse(absoluteInputPath);
      const fileName = parsedPath.name;
      const newData = [{ name: fileName, data: parseData }];
      return newData;
    } else {
      console.error("Input path is neither a file nor a directory.");
      process.exit(1);
    }
  } catch (err) {
    console.error("Error:", err);
  }
};
