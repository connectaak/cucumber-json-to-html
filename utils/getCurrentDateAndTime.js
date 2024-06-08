exports.getCurrentDateAndTime = () => {
  const today = new Date();
  // Get the current date components
  const month = today.getMonth() + 1; // Month is zero-based, so add 1
  const day = today.getDate();
  const year = today.getFullYear();
  // Get the current time components
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  // Format the date as a string in MM/DD/YYYY format
  const formattedDate =
    (month < 10 ? "0" : "") +
    month +
    "/" +
    (day < 10 ? "0" : "") +
    day +
    "/" +
    year;
  const formattedDateForFileName =
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (day < 10 ? "0" : "") +
    day +
    "-" +
    year;

  const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
  const formattedTimeForFileName = `${hours < 10 ? "0" + hours : hours}-${
    minutes < 10 ? "0" + minutes : minutes
  }-${seconds < 10 ? "0" + seconds : seconds}`;
  return {
    formattedDateTime: formattedDate + "-" + formattedTime,
    formattedDateTimeForFileName:
      formattedDateForFileName + "-" + formattedTimeForFileName,
  };
};
