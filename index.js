#!/usr/bin/env node
const { processData } = require("./utils/processData");
const { processJSONToHtml } = require("./utils/processJSONToHtml");

const inputFilePath = process.argv[2];
const outputDirPath = process.argv[3];
const outputFileNameOrTableMode = process.argv[4];
const outputFileName = process.argv[5];

const mainFun = async (inputPath, outputPath) => {
  try {
    const data = await processData(inputPath);
    if (data) {
      await processJSONToHtml(
        data,
        outputDirPath,
        outputFileNameOrTableMode,
        outputFileName
      );
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

if (!inputFilePath || !outputDirPath) {
  console.error("Usage: node yourScript.js <inputFilePath> <outputDirPath>");
  process.exit(1);
}

mainFun(inputFilePath, outputDirPath);
