const { cucumberCustomObject } = require("./cucumberCustomObject");
const { generateHTMLTableAdvance } = require("./generateHTMLTableAdvance");
const { generateHTMLTableBasic } = require("./generateHTMLTableBasic");
const { getCurrentDateAndTime } = require("./getCurrentDateAndTime");
const path = require("path");
const { cwd } = require("node:process");
const fs = require("fs").promises;

exports.processJSONToHtml = async (
  data,
  outputPath,
  outputFileNameOrTableMode,
  outputFileName
) => {
  try {
    const currentDateTime = getCurrentDateAndTime();
    const { gridData, counterData } = await cucumberCustomObject(data);
    let html;
    let outputHtmlFileName;
    if (
      outputFileNameOrTableMode &&
      outputFileNameOrTableMode == "advance" &&
      outputFileName
    ) {
      // Generate HTML table
      html = generateHTMLTableAdvance(gridData, counterData, outputFileName);
      outputHtmlFileName = outputFileName;
    } else if (
      outputFileNameOrTableMode &&
      outputFileNameOrTableMode == "advance"
    ) {
      html = generateHTMLTableAdvance(gridData, counterData);
      outputHtmlFileName = currentDateTime.formattedDateTimeForFileName;
    } else if (outputFileNameOrTableMode) {
      html = generateHTMLTableBasic(
        gridData,
        counterData,
        outputFileNameOrTableMode
      );
      outputHtmlFileName = outputFileNameOrTableMode;
    } else {
      html = generateHTMLTableBasic(gridData, counterData);
      outputHtmlFileName = currentDateTime.formattedDateTimeForFileName;
    }

    // Ensure the output directory exists
    const absoluteOutputDir = path.resolve(cwd(), outputPath);
    await fs.mkdir(absoluteOutputDir, { recursive: true });

    // Write HTML to a file
    const outputFilePath = path.join(
      absoluteOutputDir,

      `${outputHtmlFileName}.html`
    );
    await fs.writeFile(outputFilePath, html, "utf8");

    // Log the path of the generated HTML file
    console.log("HTML file created successfully:", outputFilePath);
  } catch (err) {
    console.error("Error:", err);
  }
};
