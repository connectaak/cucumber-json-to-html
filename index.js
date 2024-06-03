#!/usr/bin/env node
// const path = require("path");
// const { cucumberCustomObject } = require("./utils/cucumberCustomObject");
// const { generateHTMLTable } = require("./utils/generateHTMLTable");
// const { argv, cwd } = require("node:process");
// const fs = require("fs").promises;

// const filePath = process.argv[2];

// const mainFun = async (relativePath) => {
//   try {
//     const absolutePath = path.resolve(cwd(), relativePath);
//     const data = await fs.readFile(absolutePath, "utf8");
//     const { gridData, counterData } = await cucumberCustomObject(
//       JSON.parse(data)
//     );

//     // Generate HTML table
//     const html = generateHTMLTable(gridData, counterData);

//     // Ensure the directory for the output file exists
//     const outputDir = path.join(__dirname, "html");
//     await fs.mkdir(outputDir, { recursive: true });

//     // Write HTML to a file
//     const outputPath = path.join(outputDir, "output.html");
//     await fs.writeFile(outputPath, html, "utf8");

//     // Log the path of the generated HTML file
//     console.log("HTML file created successfully:", outputPath);
//   } catch (err) {
//     console.error("Error:", err);
//   }
// };

// if (filePath) {
//   mainFun(filePath);
// } else {
//   console.log("No file path provided. Exiting.");
// }
// #!/usr/bin/env node
const path = require("path");
const { cucumberCustomObject } = require("./utils/cucumberCustomObject");
const { generateHTMLTable } = require("./utils/generateHTMLTable");
const { cwd } = require("node:process");
const fs = require("fs").promises;

const inputFilePath = process.argv[2];
const outputDirPath = process.argv[3];

const mainFun = async (inputPath, outputPath) => {
  try {
    // const currentDateTime = getCurrentDateAndTime();
    const absoluteInputPath = path.resolve(cwd(), inputPath);
    const data = await fs.readFile(absoluteInputPath, "utf8");

    const parsedPath = path.parse(absoluteInputPath);
    const fileName = parsedPath.name;
    const { gridData, counterData } = await cucumberCustomObject(
      JSON.parse(data)
    );

    // Generate HTML table
    const html = generateHTMLTable(gridData, counterData, fileName);

    // Ensure the output directory exists
    const absoluteOutputDir = path.resolve(cwd(), outputPath);
    await fs.mkdir(absoluteOutputDir, { recursive: true });

    // Write HTML to a file
    const outputFilePath = path.join(
      absoluteOutputDir,
      `${fileName}-output.html`
    );
    await fs.writeFile(outputFilePath, html, "utf8");

    // Log the path of the generated HTML file
    console.log("HTML file created successfully:", outputFilePath);
  } catch (err) {
    console.error("Error:", err);
  }
};

if (!inputFilePath || !outputDirPath) {
  console.error("Usage: node yourScript.js <inputFilePath> <outputDirPath>");
  process.exit(1);
}

mainFun(inputFilePath, outputDirPath);
