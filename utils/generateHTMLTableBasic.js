const { processTableData } = require("./processTableData");

exports.generateHTMLTableBasic = (data, counterData, fileName) => {
  const {
    COLORS,
    headCells,
    currentDateTime,
    gridSummary,
    gridSummaryPercentage,
    totalDurationMiliseconds,
    totalDurationSeconds,
    totalDurationMinutes,
    totalFeatures,
  } = processTableData(data);

  let html = `<html> <style>
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 5px;
  }

  body.light-mode {
    background-color: #ffffff;
    color: #000000;
  }

  body.dark-mode {
    background-color: #121212;
    color: #ffffff;
  }

  .light-mode th,
  .light-mode td {
    border-color: #000000;
  }

  .dark-mode th,
  .dark-mode td {
    border-color: #ffffff !important;
  }

  .dark-mode table {
    border-color: #ffffff !important;
  }

  .light-mode table {
    border-color: #000000;
  }

  .toggle-btn {
    padding: 10px 20px;
    cursor: pointer;
    background-color: #fcd73c;
    border: none;
    font-size: 16px;
    margin-left:50px;
    
  }
    .headerStyle{
   background-color: #fcd73c;
    display:flex;
    justify-content: space-between;
    align-items:center;
    margin-bottom:20px;
    padding:10px;
    height:50px;
    color:#000000 !important;
    }
</style>
 <script>
</script>
<head><title>Grid Data</title></head><body style='margin:0' >`;
  html += `<div class='headerStyle'><h6 style='font-size:25px;'>${
    fileName ? fileName : "Cucumber Report"
  }  </h6> <div style='display:flex;align-items:center;'> <h6 style='margin-right:50px;font-size:18px;' >V1.1</h6> <h6 style='font-size:18px;'>
 Date and Time:
  ${
    currentDateTime.formattedDateTime
  } </h6> </div>   </div> <section style='margin:50px'>`;
  html += "<table style='margin:auto;width:100%;' ><tr>";

  // Initial cell for spacing
  html += `<th bgcolor="${COLORS["Header"]}" style='padding: 5px;border: 1px solid #000000;' ></th>`;

  // Cells for Steps
  html += `<th  style='padding: 5px;border: 1px solid #000000;' bgcolor="${COLORS["Header"]}"  colspan="6" align="center">Steps</th>`;

  // Cells for Scenarios
  html += `<th  style='padding: 5px;border: 1px solid #000000;' bgcolor="${COLORS["Header"]}" class="border" colspan="3" align="center">Scenarios</th>`;

  // Cells for Features
  html += `<th style='padding: 5px;border: 1px solid #000000;' bgcolor="${COLORS["Header"]}" class="border" colspan="7" align="center">Metrics</th>`;

  html += "</tr>";

  // Table Head
  html += "<tr>";
  headCells.forEach((headCell) => {
    html += `<th  style='padding: 5px;border: 1px solid #000000;' align="center" class="border" bgcolor="${
      COLORS[headCell.label]
    }">${headCell.label}</th>`;
  });
  html += "</tr>";

  // Table Body
  data.forEach((row) => {
    html += "<tr>";
    html += `<th style='padding: 5px;border: 1px solid #000000;'>${row.id}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;'>${row.reportName}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;'>${row.name}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center" bgcolor="${
      row.stepsPassed !== 0 ? COLORS["Passed"] : ""
    }">${row.stepsPassed}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center" bgcolor="${
      row.stepsFailed !== 0 ? COLORS["Failed"] : ""
    }">${row.stepsFailed}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center" bgcolor="${
      row.stepsSkipped !== 0 ? COLORS["Skipped"] : ""
    }">${row.stepsSkipped}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center" bgcolor="${
      row.stepsUndefined !== 0 ? COLORS["Undefined"] : ""
    }">${row.stepsUndefined}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center" bgcolor="${
      row.stepsPending !== 0 ? COLORS["Pending"] : ""
    }">${row.stepsPending}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center" bgcolor="${
      row.stepsTotal !== 0 ? COLORS["Total"] : ""
    }">${row.stepsTotal}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center" bgcolor="${
      row.scenariosPassed !== 0 ? COLORS["Passed"] : ""
    }">${row.scenariosPassed}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center" bgcolor="${
      row.scenariosFailed !== 0 ? COLORS["Failed"] : ""
    }">${row.scenariosFailed}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center" bgcolor="${
      row.scenariosTotal !== 0 ? COLORS["Total"] : ""
    }">${row.scenariosTotal}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center">${row.row_duration}</td>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center">${row.duration_miliseconds}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center">${row.duration_seconds}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center">${row.duration_minutes}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center" bgcolor="${
      COLORS[row.status]
    }">${row.status}</th>`;
    html += "</tr>";
  });

  // summery
  html += "<tr>";
  html += `<th rowspan="5" colspan="3" style='padding: 5px 0;border: 1px solid #000000;'>summery</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummary.totalStepsPassed}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center">${gridSummary.totalStepsFailed}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummary.totalStepsSkipped}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummary.totalStepsUndefined}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummary.totalStepsPending}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" rowspan="5" >${gridSummary.totalStepsTotal}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummary.totalScenariosPassed}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummary.totalScenariosFailed}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" rowspan="4">${gridSummary.totalScenariosTotal}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center"  rowspan="4">${counterData[3]?.value}</td>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center"  rowspan="4">${totalDurationMiliseconds}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center"  rowspan="4">${totalDurationSeconds}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center"  rowspan="4">${totalDurationMinutes}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center"  rowspan="4">${totalFeatures}</th>`;

  html += "</tr>";
  // summery
  html += "<tr>";
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center" >${gridSummaryPercentage.totalStepsPassedPercent}%</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center">${gridSummaryPercentage.totalStepsFailedPercent}%</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center" >${gridSummaryPercentage.totalStepsSkippedPercent}%</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummaryPercentage.totalStepsUndefinedPercent}%</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center" >${gridSummaryPercentage.totalStepsPendingPercent}%</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center" >${gridSummaryPercentage.totalScenariosPassedPercent}%</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center" >${gridSummaryPercentage.totalScenariosFailedPercent}%</th>`;
  html += "</tr>";

  html += "</table></section> </body></html>";
  return html;
};
