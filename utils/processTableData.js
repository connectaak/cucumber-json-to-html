const { getCurrentDateAndTime } = require("./getCurrentDateAndTime");

exports.processTableData = (data) => {
  const COLORS = {
    Passed: "#8fdc93",
    Failed: "#f29191",
    Skipped: "#83abf9",
    Pending: "#f3f68b",
    Undefined: "#f7b96f",
    Total: "#d3d1d2",
    Header: "#60cbf1",
  };

  // Head Cells.........totalFeatures
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

  return {
    COLORS,
    headCells,
    currentDateTime,
    gridSummary,
    gridSummaryPercentage,
    totalDurationMiliseconds,
    totalDurationSeconds,
    totalDurationMinutes,
    totalFeatures,
  };
};
