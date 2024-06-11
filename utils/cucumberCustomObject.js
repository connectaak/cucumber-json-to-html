const { NanosecondsConverter } = require("./NanosecondsConverter");

exports.cucumberCustomObject = (jsonData) => {
  const featuresData = [];

  jsonData?.forEach((report) => {
    let stepPassed = 0;
    let stepFailed = 0;
    let stepSkip = 0;
    let stepPending = 0;
    let stepUndefined = 0;
    let scenariosPassed = 0;
    let scenariosFailed = 0;
    let featureDuration = 0;
    let featureStatus = "Passed";

    report?.data?.forEach((feature) => {
      feature?.elements?.forEach((element) => {
        element?.steps?.forEach((step) => {
          switch (step.result.status) {
            case "passed":
              stepPassed++;
              break;
            case "failed":
              stepFailed++;
              break;
            case "skipped":
              stepSkip++;
              break;
            case "pending":
              stepPending++;
              break;
            case "undefined":
              stepUndefined++;
              break;
          }
        });

        if (element.steps.every((step) => step.result.status === "passed")) {
          scenariosPassed++;
        } else {
          scenariosFailed++;
          featureStatus = "Failed";
        }
      });
      feature?.elements?.forEach((scenario) => {
        scenario?.steps?.forEach((step) => {
          featureDuration += step?.result?.duration || 0; // add duration to feature duration
        });
      });
      // eslint-disable-next-line no-unused-expressions
      featureDuration;
      featuresData.push({
        reportName: report.name,
        feature: feature.name,
        stepPassed: stepPassed,
        stepFailed: stepFailed,
        stepSkip: stepSkip,
        stepPending: stepPending,
        stepUndefined: stepUndefined,
        stepTotal:
          stepPassed + stepFailed + stepSkip + stepPending + stepUndefined,
        scenariosPassed: scenariosPassed,
        scenariosFailed: scenariosFailed,
        scenariosTotal: scenariosPassed + scenariosFailed,
        featureDuration: featureDuration.toFixed(0),
        featureStatus: featureStatus,
      });
    });
  });

  const totalSteps = featuresData.reduce(
    (accumulator, currentValue) => accumulator + currentValue?.stepTotal,
    0
  );

  const totalScenarios = featuresData.reduce(
    (accumulator, currentValue) => accumulator + currentValue?.scenariosTotal,
    0
  );

  const totalDuration = featuresData.reduce(
    (accumulator, currentValue) =>
      accumulator + parseInt(currentValue?.featureDuration),
    0
  );
  const counterData = [
    { title: "Features", value: featuresData.length },
    { title: "Scenarios", value: totalScenarios },
    { title: "Test/Steps", value: totalSteps },
    {
      title: "Duration",
      value: NanosecondsConverter(totalDuration).totalDuration,
    },
  ];

  const gridData = featuresData.map((item, index) => {
    return {
      id: index + 1,
      name: item.feature,
      reportName: item.reportName,
      stepsPassed: item.stepPassed,
      stepsFailed: item.stepFailed,
      stepsSkipped: item.stepSkip,
      stepsUndefined: item.stepUndefined,
      stepsPending: item.stepPending,
      stepsTotal: item.stepTotal,
      scenariosPassed: item.scenariosPassed,
      scenariosFailed: item.scenariosFailed,
      scenariosTotal: item.scenariosTotal,
      row_duration: NanosecondsConverter(item.featureDuration).totalDuration,
      duration_miliseconds: NanosecondsConverter(item.featureDuration)
        .totalMilliseconds,
      duration_seconds: NanosecondsConverter(item.featureDuration).totalSeconds,
      duration_minutes: NanosecondsConverter(item.featureDuration).totalMinutes,
      status: item.featureStatus,
    };
  });

  return { counterData, gridData };
};
