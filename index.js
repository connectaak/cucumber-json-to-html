#!/usr/bin/env node
const path = require("path");
const { cucumberCustomObject } = require("./utils/cucumberCustomObject");
const { generateHTMLTable } = require("./utils/generateHTMLTable");
const { cwd } = require("node:process");
const { getCurrentDateAndTime } = require("./utils/getCurrentDateAndTime");
const fs = require("fs").promises;

const inputFilePath = process.argv[2];
const outputDirPath = process.argv[3];
const outputFileName = process.argv[4];

const processJSONToHtml = async (data, outputPath, outputFileName) => {
  try {
    const { gridData, counterData } = await cucumberCustomObject(data);

    // Generate HTML table
    const html = generateHTMLTable(gridData, counterData, outputFileName);
    const currentDateTime = getCurrentDateAndTime();
    // Ensure the output directory exists
    const absoluteOutputDir = path.resolve(cwd(), outputPath);
    await fs.mkdir(absoluteOutputDir, { recursive: true });

    // Write HTML to a file
    const outputFilePath = path.join(
      absoluteOutputDir,
      outputFileName
        ? `${outputFileName}.html`
        : `${currentDateTime.formattedDateTimeForFileName}.html`
    );
    await fs.writeFile(outputFilePath, html, "utf8");

    // Log the path of the generated HTML file
    console.log("HTML file created successfully:", outputFilePath);
  } catch (err) {
    console.error("Error:", err);
  }
};
const processData = async (inputPath) => {
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
const mainFun = async (inputPath, outputPath) => {
  try {
    const data = await processData(inputPath);
    if (data) {
      await processJSONToHtml(data, outputDirPath, outputFileName);
    }
    // console.log("data", data);
  } catch (err) {
    console.error("Error:", err);
  }
};

if (!inputFilePath || !outputDirPath) {
  console.error("Usage: node yourScript.js <inputFilePath> <outputDirPath>");
  process.exit(1);
}

mainFun(inputFilePath, outputDirPath);
