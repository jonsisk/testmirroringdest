import dayjs from "dayjs";
import advanced from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advanced);

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

export const getUserDate = (date, showTime = false) => {
  if (!date) {
    return null;
  }

  const FORMAT = showTime ? `MMM D, YYYY, h:mma ${insertTimezoneIntoTemplate(date)}` : "MMM D";
  return dayjs.utc(date).local().format(FORMAT);
};

export const insertTimezoneIntoTemplate = (date, { brackets } = { brackets: "[]" }) => {
  let openb = "[";
  let closeb = "]";

  if (brackets === "()") {
    openb = "(";
    closeb = ")";
  }

  const timezoneAbbr = getTimezoneAbbr(date);
  return timezoneAbbr ? `${openb}${timezoneAbbr}${closeb}` : "";
};

export const getTimezoneAbbr = (date) => {
  if (!date) {
    return null;
  }

  const timeZoneAbbr = dayjs(date).format("z");
  return timeZoneAbbr;
};
