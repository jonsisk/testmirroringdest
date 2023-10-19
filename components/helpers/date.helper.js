import dayjs from "dayjs";
import advanced from "dayjs/plugin/advancedFormat";
import isToday from "dayjs/plugin/isToday";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advanced);
dayjs.extend(isToday);

/**
 * Given a date, it returns a formatted date string with a fixed timezone, used for article republishing.
 */
export const getDateForRepublish = (date, showTime = false) => {
  if (!date) {
    return null;
  }

  const FORMAT = showTime ? `MMM D, YYYY [at] h:mma z` : "MMM D, YYYY";
  return dayjs.utc(date).tz("America/New_York").format(FORMAT);
};

export const getDateForMetadata = (date) => {
  if (!date) {
    return null;
  }

  const FORMAT = "YYYY-MM-DD[T]hh:mm:ssZZ";
  return dayjs.utc(date).tz("America/New_York").format(FORMAT);
};

export const isDateAfter = (date1, date2) => {
  if (!date1 || !date2) {
    return null;
  }

  return dayjs(date1).isAfter(date2);
};

export const getUserDate = (date, showTime = false) => {
  if (!date) {
    return null;
  }
  let now = dayjs();
  const STANDARD_FORMAT = now.year() > dayjs(date).year() ? "MMMM D, YYYY" : "MMMM D";

  let FORMAT;
  const isToday = dayjs(date).isToday();

  if (showTime) {
    FORMAT = `MMMM D, YYYY, h:mma z`;
  } else {
    if (isToday) {
      FORMAT = `[Today,] h:mma z`;
    } else {
      FORMAT = STANDARD_FORMAT;
    }
  }

  return dayjs.utc(date).local().format(FORMAT);
};
