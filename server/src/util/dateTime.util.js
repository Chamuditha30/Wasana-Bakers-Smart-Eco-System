import { createError } from "./error.util.js";

//initialize days
const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

//validate date
export const validateDate = (date) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }

  const parsedDate = new Date(`${date}T00:00:00.000Z`);

  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === date
  );
};

//check selected date is today or in the future
export const validateFutureDate = (date) => {
  if (!validateDate(date)) return false;

  //get today's date in Sri Lanka
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  return date >= today;
};

//convert date string to Date object
export const convertToDate = (date) => {
  if (!validateDate(date)) throw createError("Invalid date", 400);

  return new Date(`${date}T00:00:00.000Z`);
};

//get weekday name
export const getDayName = (date) => {
  return days[date.getUTCDay()];
};

//validate HH:mm time format
export const validateTime = (time) => {
  if (typeof time !== "string") return false;

  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
};

//convert HH:mm into minutes
export const timeToMinutes = (time) => {
  if (!validateTime(time)) {
    throw new Error("Invalid time format");
  }

  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
};

//convert minutes into HH:mm
export const minutesToTime = (minutes) => {
  if (!Number.isInteger(minutes) || minutes < 0 || minutes >= 1440)
    createError("Invalid time value", 400);

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(
    2,
    "0",
  )}`;
};

//validate opening and closing times
export const validateTimeRange = (open, close) => {
  if (!validateTime(open) || !validateTime(close)) {
    return false;
  }

  return timeToMinutes(open) < timeToMinutes(close);
};
