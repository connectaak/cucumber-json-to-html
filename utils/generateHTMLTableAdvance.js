const { getCurrentDateAndTime } = require("./getCurrentDateAndTime");
// const image = require("");
exports.generateHTMLTableAdvance = (data, counterData, fileName) => {
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
      id: "SN",
      numeric: false,
      disablePadding: true,
      label: "S.NO",
    },
    {
      id: "reportName",
      numeric: false,
      disablePadding: true,
      label: "Report Name",
    },
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
      label: "Raw Duration",
    },
    {
      id: "duration_miliseconds",
      numeric: true,
      disablePadding: false,
      label: "Duration Miliseconds",
    },
    {
      id: "duration_seconds",
      numeric: true,
      disablePadding: false,
      label: "Duration Seconds",
    },
    {
      id: "duration_minutes",
      numeric: true,
      disablePadding: false,
      label: "Duration Minutes",
    },

    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
  ];
  const currentDateTime = getCurrentDateAndTime();
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
  const totalDurationMiliseconds = data.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.duration_miliseconds);
  }, 0);
  const totalDurationSeconds = data.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.duration_seconds);
  }, 0);
  const totalDurationMinutes = data.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.duration_minutes);
  }, 0);

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

// const { getCurrentDateAndTime } = require("./getCurrentDateAndTime");

// exports.generateHTMLTable = (data, counterData, fileName) => {
//   const COLORS = {
//     Passed: "#8fdc93",
//     Failed: "#f29191",
//     Skipped: "#83abf9",
//     Pending: "#f3f68b",
//     Undefined: "#f7b96f",
//     Total: "#d3d1d2",
//     Header: "#60cbf1",
//   };

//   // Head Cells.........
//   const headCells = [
//     { id: "SN", numeric: false, disablePadding: true, label: "S.NO" },
//     {
//       id: "reportName",
//       numeric: false,
//       disablePadding: true,
//       label: "Report Name",
//     },
//     { id: "name", numeric: false, disablePadding: true, label: "Features" },
//     {
//       id: "stepsPassed",
//       numeric: true,
//       disablePadding: false,
//       label: "Passed",
//     },
//     {
//       id: "stepsFailed",
//       numeric: true,
//       disablePadding: false,
//       label: "Failed",
//     },
//     {
//       id: "stepsSkipped",
//       numeric: true,
//       disablePadding: false,
//       label: "Skipped",
//     },
//     {
//       id: "stepsUndefined",
//       numeric: true,
//       disablePadding: false,
//       label: "Undefined",
//     },
//     {
//       id: "stepsPending",
//       numeric: true,
//       disablePadding: false,
//       label: "Pending",
//     },
//     { id: "stepsTotal", numeric: true, disablePadding: false, label: "Total" },
//     {
//       id: "scenariosPassed",
//       numeric: true,
//       disablePadding: false,
//       label: "Passed",
//     },
//     {
//       id: "scenariosFailed",
//       numeric: true,
//       disablePadding: false,
//       label: "Failed",
//     },
//     {
//       id: "scenariosTotal",
//       numeric: true,
//       disablePadding: false,
//       label: "Total",
//     },
//     {
//       id: "row_duration",
//       numeric: true,
//       disablePadding: false,
//       label: "Raw Duration",
//     },
//     {
//       id: "duration_miliseconds",
//       numeric: true,
//       disablePadding: false,
//       label: "Duration Miliseconds",
//     },
//     {
//       id: "duration_seconds",
//       numeric: true,
//       disablePadding: false,
//       label: "Duration Seconds",
//     },
//     {
//       id: "duration_minutes",
//       numeric: true,
//       disablePadding: false,
//       label: "Duration Minutes",
//     },
//     { id: "status", numeric: true, disablePadding: false, label: "Status" },
//   ];

//   const currentDateTime = getCurrentDateAndTime();

//   let totalStepsPassed = 0;
//   let totalStepsFailed = 0;
//   let totalStepsSkipped = 0;
//   let totalStepsUndefined = 0;
//   let totalStepsPending = 0;
//   let totalStepsTotal = 0;
//   let totalScenariosPassed = 0;
//   let totalScenariosFailed = 0;
//   let totalScenariosTotal = 0;
//   let totalFeatures = 0;

//   data.forEach((item) => {
//     totalStepsPassed += item.stepsPassed;
//     totalStepsFailed += item.stepsFailed;
//     totalStepsSkipped += item.stepsSkipped;
//     totalStepsUndefined += item.stepsUndefined;
//     totalStepsPending += item.stepsPending;
//     totalStepsTotal += item.stepsTotal;
//     totalScenariosPassed += item.scenariosPassed;
//     totalScenariosFailed += item.scenariosFailed;
//     totalScenariosTotal += item.scenariosTotal;
//   });

//   totalFeatures += data.length;

//   const gridSummary = {
//     totalStepsPassed,
//     totalStepsFailed,
//     totalStepsSkipped,
//     totalStepsUndefined,
//     totalStepsPending,
//     totalStepsTotal,
//     totalScenariosPassed,
//     totalScenariosFailed,
//     totalScenariosTotal,
//   };

//   const totalStepsPassedPercent = (
//     (totalStepsPassed / totalStepsTotal) *
//     100
//   ).toFixed(0);
//   const totalStepsFailedPercent = (
//     (totalStepsFailed / totalStepsTotal) *
//     100
//   ).toFixed(0);
//   const totalStepsSkippedPercent = (
//     (totalStepsSkipped / totalStepsTotal) *
//     100
//   ).toFixed(0);
//   const totalStepsUndefinedPercent = (
//     (totalStepsUndefined / totalStepsTotal) *
//     100
//   ).toFixed(0);
//   const totalStepsPendingPercent = (
//     (totalStepsPending / totalStepsTotal) *
//     100
//   ).toFixed(0);
//   const totalScenariosPassedPercent = (
//     (totalScenariosPassed / totalScenariosTotal) *
//     100
//   ).toFixed(0);
//   const totalScenariosFailedPercent = (
//     (totalScenariosFailed / totalScenariosTotal) *
//     100
//   ).toFixed(0);

//   const gridSummaryPercentage = {
//     totalStepsPassedPercent,
//     totalStepsFailedPercent,
//     totalStepsSkippedPercent,
//     totalStepsUndefinedPercent,
//     totalStepsPendingPercent,
//     totalScenariosPassedPercent,
//     totalScenariosFailedPercent,
//     totalFeatures,
//   };

//   const totalDurationMiliseconds = data.reduce(
//     (acc, cur) => acc + parseFloat(cur.duration_miliseconds),
//     0
//   );
//   const totalDurationSeconds = data.reduce(
//     (acc, cur) => acc + parseFloat(cur.duration_seconds),
//     0
//   );
//   const totalDurationMinutes = data.reduce(
//     (acc, cur) => acc + parseFloat(cur.duration_minutes),
//     0
//   );

//   let html = `<html>
//   <head>
//     <title>Grid Data</title>
//     <style>
//       table, th, td {
//         border:1px solid black;
//         border-collapse: collapse;
//         padding:5px;
//       }
//       body.light-mode {
//         background-color: white;
//         color: black;
//       }
//       body.dark-mode {
//         background-color: #121212;
//         color: white;
//       }
//       .light-mode th, .light-mode td {
//         border: 1px solid black;
//       }
//       .dark-mode th, .dark-mode td {
//         border: 1px solid white;
//       }
//     </style>
//     <script>
//       function toggleMode() {
//         const body = document.body;
//         body.classList.toggle('dark-mode');
//         body.classList.toggle('light-mode');
//         const mode = body.classList.contains('dark-mode') ? 'Dark' : 'Light';
//         document.getElementById('mode-button').innerText = mode + ' Mode';
//       }
//     </script>
//   </head>
//   <body class="light-mode" style='margin:0'>
//     <div style='background-color:#FCD73C;display:flex; justify-content: space-between;align-items:center;margin-bottom:20px; padding:10px;height:80px '>
//       <h6 style='font-size:25px;'>${
//         fileName ? fileName : "Cucumber Report"
//       }</h6>
//       <div style='display:flex;align-items:center;'>
//         <h6 style='margin-right:50px;font-size:18px;'>V1</h6>
//         <h6 style='font-size:18px;'>Date and Time: ${
//           currentDateTime.formattedDateTime
//         }</h6>
//         <button id="mode-button" onclick="toggleMode()">Dark Mode</button>
//       </div>
//     </div>
//     <section style='margin:50px'>
//       <table style='margin:auto;width:100%;'>
//         <tr>
//           <th bgcolor="${
//             COLORS["Header"]
//           }" ></th>
//           <th  bgcolor="${
//             COLORS["Header"]
//           }" colspan="6">Steps</th>
//           <th  bgcolor="${
//             COLORS["Header"]
//           }" colspan="3">Scenarios</th>
//           <th  bgcolor="${
//             COLORS["Header"]
//           }" colspan="7">Metrics</th>
//         </tr>
//         <tr>`;

//   headCells.forEach((headCell) => {
//     html += `<th  bgcolor="${
//       COLORS[headCell.label]
//     }">${headCell.label}</th>`;
//   });

//   html += `</tr>`;

//   data.forEach((row) => {
//     html += `<tr>
//       <th >${row.id}</th>
//       <th >${row.reportName}</th>
//       <th >${row.name}</th>
//       <th  bgcolor="${
//         row.stepsPassed !== 0 ? COLORS["Passed"] : ""
//       }">${row.stepsPassed}</th>
//       <th  bgcolor="${
//         row.stepsFailed !== 0 ? COLORS["Failed"] : ""
//       }">${row.stepsFailed}</th>
//       <th  bgcolor="${
//         row.stepsSkipped !== 0 ? COLORS["Skipped"] : ""
//       }">${row.stepsSkipped}</th>
//       <th  bgcolor="${
//         row.stepsUndefined !== 0 ? COLORS["Undefined"] : ""
//       }">${row.stepsUndefined}</th>
//       <th  bgcolor="${
//         row.stepsPending !== 0 ? COLORS["Pending"] : ""
//       }">${row.stepsPending}</th>
//       <th  bgcolor="${
//         row.stepsTotal !== 0 ? COLORS["Total"] : ""
//       }">${row.stepsTotal}</th>
//       <th  bgcolor="${
//         row.scenariosPassed !== 0 ? COLORS["Passed"] : ""
//       }">${row.scenariosPassed}</th>
//       <th  bgcolor="${
//         row.scenariosFailed !== 0 ? COLORS["Failed"] : ""
//       }">${row.scenariosFailed}</th>
//       <th  bgcolor="${
//         row.scenariosTotal !== 0 ? COLORS["Total"] : ""
//       }">${row.scenariosTotal}</th>
//       <th >${
//         row.row_duration
//       }</th>
//       <th >${
//         row.duration_miliseconds
//       }</th>
//       <th >${
//         row.duration_seconds
//       }</th>
//       <th >${
//         row.duration_minutes
//       }</th>
//       <th  bgcolor="${
//         row.status === "Passed" ? COLORS["Passed"] : COLORS["Failed"]
//       }">${row.status}</th>
//     </tr>`;
//   });

//   html += `</table></section>
//   </body>
//   </html>`;

//   return html;
// };
