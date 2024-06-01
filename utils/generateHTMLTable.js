exports.generateHTMLTable = (data, counterData) => {
  const COLORS = {
    Passed: "#8fdc93",
    Failed: "#f29191",
    Skipped: "#83abf9",
    Pending: "#f3f68b",
    Undefined: "#f7b96f",
    Total: "#d3d1d2",
    Header: "#60cbf1",
  };

  // Head Cells.........
  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Features",
    },
    {
      id: "stepsPassed",
      numeric: true,
      disablePadding: false,
      label: "Passed",
    },
    {
      id: "stepsFailed",
      numeric: true,
      disablePadding: false,
      label: "Failed",
    },
    {
      id: "stepsSkipped",
      numeric: true,
      disablePadding: false,
      label: "Skipped",
    },
    {
      id: "stepsUndefined",
      numeric: true,
      disablePadding: false,
      label: "Undefined",
    },
    {
      id: "stepsPending",
      numeric: true,
      disablePadding: false,
      label: "Pending",
    },
    {
      id: "stepsTotal",
      numeric: true,
      disablePadding: false,
      label: "Total",
    },
    {
      id: "scenariosPassed",
      numeric: true,
      disablePadding: false,
      label: "Passed",
    },
    {
      id: "scenariosFailed",
      numeric: true,
      disablePadding: false,
      label: "Failed",
    },
    {
      id: "scenariosTotal",
      numeric: true,
      disablePadding: false,
      label: "Total",
    },
    {
      id: "row_duration",
      numeric: true,
      disablePadding: false,
      label: "Row Duration",
    },
    {
      id: "duration",
      numeric: true,
      disablePadding: false,
      label: "Duration",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
  ];

  // Generating Table summary ...........
  let totalStepsPassed = 0;
  let totalStepsFailed = 0;
  let totalStepsSkipped = 0;
  let totalStepsUndefined = 0;
  let totalStepsPending = 0;
  let totalStepsTotal = 0;
  let totalScenariosPassed = 0;
  let totalScenariosFailed = 0;
  let totalScenariosTotal = 0;
  let totalFeatures = 0;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    totalStepsPassed += item.stepsPassed;
    totalStepsFailed += item.stepsFailed;
    totalStepsSkipped += item.stepsSkipped;
    totalStepsUndefined += item.stepsUndefined;
    totalStepsPending += item.stepsPending;
    totalStepsTotal += item.stepsTotal;
    totalScenariosPassed += item.scenariosPassed;
    totalScenariosFailed += item.scenariosFailed;
    totalScenariosTotal += item.scenariosTotal;
  }
  totalFeatures += data.length;
  const gridSummary = {
    totalStepsPassed,
    totalStepsFailed,
    totalStepsSkipped,
    totalStepsUndefined,
    totalStepsPending,
    totalStepsTotal,
    totalScenariosPassed,
    totalScenariosFailed,
    totalScenariosTotal,
  };

  const totalStepsPassedPercent = (
    (totalStepsPassed / totalStepsTotal) *
    100
  ).toFixed(0);
  const totalStepsFailedPercent = (
    (totalStepsFailed / totalStepsTotal) *
    100
  ).toFixed(0);
  const totalStepsSkippedPercent = (
    (totalStepsSkipped / totalStepsTotal) *
    100
  ).toFixed(0);
  const totalStepsUndefinedPercent = (
    (totalStepsUndefined / totalStepsTotal) *
    100
  ).toFixed(0);
  const totalStepsPendingPercent = (
    (totalStepsPending / totalStepsTotal) *
    100
  ).toFixed(0);
  const totalScenariosPassedPercent = (
    (totalScenariosPassed / totalScenariosTotal) *
    100
  ).toFixed(0);
  const totalScenariosFailedPercent = (
    (totalScenariosFailed / totalScenariosTotal) *
    100
  ).toFixed(0);
  const gridSummaryPercentage = {
    totalStepsPassedPercent,
    totalStepsFailedPercent,
    totalStepsSkippedPercent,
    totalStepsUndefinedPercent,
    totalStepsPendingPercent,
    totalScenariosPassedPercent,
    totalScenariosFailedPercent,
    totalFeatures,
  };
  // Use the reduce function to calculate the sum of all durations
  const totalDuration = data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.duration;
  }, 0);

  let html = `<html> <style>
table, th, td {
  border:1px solid black;
  border-collapse: collapse;
  padding:5px;
}
</style> <head><title>Grid Data</title></head><body style='margin: auto;width:950px '>`;
  html += "<table ><tr>";

  // Initial cell for spacing
  html += `<th bgcolor="${COLORS["Header"]}" style='padding: 5px;border: 1px solid #000000;' ></th>`;

  // Cells for Steps
  html += `<th  style='padding: 5px;border: 1px solid #000000;' bgcolor="${COLORS["Header"]}"  colspan="6" align="center">Steps</th>`;

  // Cells for Scenarios
  html += `<th  style='padding: 5px;border: 1px solid #000000;' bgcolor="${COLORS["Header"]}" class="border" colspan="3" align="center">Scenarios</th>`;

  // Cells for Features
  html += `<th style='padding: 5px;border: 1px solid #000000;' bgcolor="${COLORS["Header"]}" class="border" colspan="3" align="center">Features</th>`;

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
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center">${row.duration}</th>`;
    html += `<th style='padding: 5px;border: 1px solid #000000;' align="center" bgcolor="${
      COLORS[row.status]
    }">${row.status}</th>`;
    html += "</tr>";
  });

  // summery
  html += "<tr>";
  html += `<th rowspan="10" style='padding: 5px 0;border: 1px solid #000000;'>summery</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummary.totalStepsPassed}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center">${gridSummary.totalStepsFailed}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummary.totalStepsSkipped}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummary.totalStepsUndefined}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummary.totalStepsPending}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummary.totalStepsTotal}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummary.totalScenariosPassed}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummary.totalScenariosFailed}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummary.totalScenariosTotal}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center">${counterData[3]?.value}</td>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center">${totalDuration}</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${totalFeatures}</th>`;
  html += "</tr>";
  // summery
  html += "<tr>";
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center" >${gridSummaryPercentage.totalStepsPassedPercent}%</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center">${gridSummaryPercentage.totalStepsFailedPercent}%</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center" >${gridSummaryPercentage.totalStepsSkippedPercent}%</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;' align="center" >${gridSummaryPercentage.totalStepsUndefinedPercent}%</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center" >${gridSummaryPercentage.totalStepsPendingPercent}%</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center" ></th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center" >${gridSummaryPercentage.totalScenariosPassedPercent}%</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center" >${gridSummaryPercentage.totalScenariosFailedPercent}%</th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center"></td>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center"></th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center" ></th>`;
  html += `<th style='padding: 5px 0;border: 1px solid #000000;margin:0;' align="center" ></th>`;
  html += "</tr>";

  html += "</table></body></html>";
  return html;
};
