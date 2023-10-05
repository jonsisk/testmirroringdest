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
  let userDate = dayjs(date);
  const STANDARD_FORMAT = now.year() > dayjs(date).year() ? "MMMM D, YYYY" : "MMMM D";

  const FORMAT = showTime
    ? `MMMM D, YYYY, h:mma ${insertTimezoneIntoTemplate(date)}`
    : STANDARD_FORMAT;

  const nowFormated = dayjs.utc().local().format("MMMM D, YYYY, h:mma").replace(",", "").split(" ");
  const userDateFormated = userDate.utc().format("MMMM D, YYYY, h:mma").replace(",", "").split(" ");
  const userDateLocalFormated = userDate
    .local()
    .format("MMMM D, YYYY, h:mma")
    .replace(",", "")
    .split(" ");
  let isToday = false;
  if (
    nowFormated[0] === userDateFormated[0] &&
    nowFormated[1] === userDateFormated[1] &&
    nowFormated[2] === userDateFormated[2]
  ) {
    isToday = true;
  }

  const localTimeZone = Date().toString().split(" ")[5].substring(0, 6);

  return isToday
    ? `Today, ${userDateLocalFormated[3]} ${localTimeZone}`
    : dayjs.utc(date).local().format(FORMAT);
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
