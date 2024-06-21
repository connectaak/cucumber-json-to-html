const { processTableData } = require("./processTableData");

exports.generateHTMLTableAdvance = (data, counterData, fileName) => {
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

  let html = `<html><head> <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grid Data</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
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
    height:80px;
    color:#000000 !important;
    }
    img{
    widht:50px;
    height:50px;
    }
</style>
 <script>
  function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    // const mode = body.classList.contains('dark-mode') ? 'Light' : 'Dark';
    // document.getElementById('mode-button').innerText = mode + ' Mode';
  }
</script>
</head><body style='margin:0' >`;
  html += `<div class='headerStyle'><h6 style='font-size:25px;'>${
    fileName ? fileName : "Cucumber Report"
  }  </h6> <div style='display:flex;align-items:center;'> <h6 style='margin-right:50px;font-size:18px;' >V1.1 </h6> <h6 style='font-size:18px;'>
 Date and Time:
  ${
    currentDateTime.formattedDateTime
  } </h6> <button id="mode-button" class="toggle-btn"  onclick="toggleMode()"> <img src="https://cdn-icons-png.flaticon.com/512/8295/8295070.png" alt="day and night mode" /></button></div>   </div> <section style='margin:50px'>`;
  html += "<table style='margin:auto;width:100%;' ><tr>";

  // Initial cell for spacing
  html += `<th bgcolor="${COLORS["Header"]}" ></th>`;

  // Cells for Steps
  html += `<th  bgcolor="${COLORS["Header"]}"  colspan="6">Steps</th>`;

  // Cells for Scenarios
  html += `<th  bgcolor="${COLORS["Header"]}"  colspan="3">Scenarios</th>`;

  // Cells for Features
  html += `<th  bgcolor="${COLORS["Header"]}"  colspan="7" >Metrics</th>`;

  html += "</tr>";

  // Table Head
  html += "<tr>";
  headCells.forEach((headCell) => {
    html += `<th  bgcolor="${COLORS[headCell.label]}">${headCell.label}</th>`;
  });
  html += "</tr>";

  // Table Body
  data.forEach((row) => {
    html += "<tr>";
    html += `<th >${row.id}</th>`;
    html += `<th >${row.reportName}</th>`;
    html += `<th >${row.name}</th>`;
    html += `<th  bgcolor="${row.stepsPassed !== 0 ? COLORS["Passed"] : ""}">${
      row.stepsPassed
    }</th>`;
    html += `<th  bgcolor="${row.stepsFailed !== 0 ? COLORS["Failed"] : ""}">${
      row.stepsFailed
    }</th>`;
    html += `<th  bgcolor="${
      row.stepsSkipped !== 0 ? COLORS["Skipped"] : ""
    }">${row.stepsSkipped}</th>`;
    html += `<th  bgcolor="${
      row.stepsUndefined !== 0 ? COLORS["Undefined"] : ""
    }">${row.stepsUndefined}</th>`;
    html += `<th  bgcolor="${
      row.stepsPending !== 0 ? COLORS["Pending"] : ""
    }">${row.stepsPending}</th>`;
    html += `<th  bgcolor="${row.stepsTotal !== 0 ? COLORS["Total"] : ""}">${
      row.stepsTotal
    }</th>`;
    html += `<th  bgcolor="${
      row.scenariosPassed !== 0 ? COLORS["Passed"] : ""
    }">${row.scenariosPassed}</th>`;
    html += `<th  bgcolor="${
      row.scenariosFailed !== 0 ? COLORS["Failed"] : ""
    }">${row.scenariosFailed}</th>`;
    html += `<th  bgcolor="${
      row.scenariosTotal !== 0 ? COLORS["Total"] : ""
    }">${row.scenariosTotal}</th>`;
    html += `<th >${row.row_duration}</td>`;
    html += `<th >${row.duration_miliseconds}</th>`;
    html += `<th >${row.duration_seconds}</th>`;
    html += `<th >${row.duration_minutes}</th>`;
    html += `<th  bgcolor="${COLORS[row.status]}">${row.status}</th>`;
    html += "</tr>";
  });

  // summery
  html += "<tr>";
  html += `<th rowspan="5" colspan="3" '>summery</th>`;
  html += `<th  >${gridSummary.totalStepsPassed}</th>`;
  html += `<th >${gridSummary.totalStepsFailed}</th>`;
  html += `<th  >${gridSummary.totalStepsSkipped}</th>`;
  html += `<th  >${gridSummary.totalStepsUndefined}</th>`;
  html += `<th  >${gridSummary.totalStepsPending}</th>`;
  html += `<th  rowspan="5" >${gridSummary.totalStepsTotal}</th>`;
  html += `<th  >${gridSummary.totalScenariosPassed}</th>`;
  html += `<th  >${gridSummary.totalScenariosFailed}</th>`;
  html += `<th  rowspan="4">${gridSummary.totalScenariosTotal}</th>`;
  html += `<th   rowspan="4">${counterData[3]?.value}</td>`;
  html += `<th   rowspan="4">${totalDurationMiliseconds}</th>`;
  html += `<th   rowspan="4">${totalDurationSeconds}</th>`;
  html += `<th   rowspan="4">${totalDurationMinutes}</th>`;
  html += `<th   rowspan="4">${totalFeatures}</th>`;

  html += "</tr>";
  // summery
  html += "<tr>";
  html += `<th  >${gridSummaryPercentage.totalStepsPassedPercent}%</th>`;
  html += `<th >${gridSummaryPercentage.totalStepsFailedPercent}%</th>`;
  html += `<th  >${gridSummaryPercentage.totalStepsSkippedPercent}%</th>`;
  html += `<th ' >${gridSummaryPercentage.totalStepsUndefinedPercent}%</th>`;
  html += `<th  >${gridSummaryPercentage.totalStepsPendingPercent}%</th>`;
  html += `<th  >${gridSummaryPercentage.totalScenariosPassedPercent}%</th>`;
  html += `<th  >${gridSummaryPercentage.totalScenariosFailedPercent}%</th>`;
  html += "</tr>";

  html += "</table></section> </body></html>";
  return html;
};
