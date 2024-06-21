// import { format, addSeconds } from "date-fns";

exports.DurationConverter = (nanoseconds) => {
  // Convert nanoseconds to milliseconds
  const milliseconds = (nanoseconds / 1000000).toFixed(0);

  // Calculate total seconds
  const totalSeconds = (milliseconds / 1000).toFixed(0);

  const totalMinutes = (totalSeconds / 60).toFixed(2);
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
    totalMilliseconds: milliseconds,
    totalSeconds,
    totalMinutes,
  };
};
