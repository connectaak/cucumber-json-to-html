// import { format, addSeconds } from "date-fns";

exports.NanosecondsConverter = (nanoseconds) => {
  // Convert nanoseconds to milliseconds
  const milliseconds = nanoseconds / 1000000;

  // Calculate total seconds
  const totalSeconds = milliseconds / 1000;

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  // Format the components to always have two digits
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return {
    totalDuration: `${formattedHours}:${formattedMinutes}:${formattedSeconds}`,
    totalSeconds,
  };
};
exports.getSecondsToDuration = (totalSeconds) => {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  // total minute
  const totalMinutes = (totalSeconds / 60).toFixed(2);

  // Calculate total hours
  const totalHours = (totalSeconds / 3600).toFixed(2);

  // Output the result
  return {
    totalDuration: `${hours}:${remainingMinutes}:${remainingSeconds}`,
    totalMinutes,
    totalHours,
  };
};
