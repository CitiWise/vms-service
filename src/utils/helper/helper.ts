import moment from "moment";
import { logger } from "../logger";
const convertIstToUtc = (date, createNewIfFalsy = false) => {
  if (date) {
    return new Date(moment(date).subtract(5.5, "hours").valueOf());
  }
  if (createNewIfFalsy) {
    return new Date(moment().subtract(5.5, "hours").valueOf());
  }
  return date;
};
const convertUtcToIst = (date, createNewIfFalsy = false) => {
  if (date) {
    return new Date(moment(date).add(5.5, "hours").valueOf());
  }
  if (createNewIfFalsy) {
    return new Date(moment().add(5.5, "hours").valueOf());
  }

  return date;
};
export const transformer = {
  // called when using save or find operator
  to: (value) => {
    if (
      typeof value === "undefined" ||
      value instanceof Date ||
      typeof value === "string"
    ) {
      return convertIstToUtc(value, true);
    }

    if (typeof value === "object") {
      const val = value?._value;
      if (Array.isArray(val)) {
        // val will be of an array of date object
        // change all date to utc before saving in db
        val.forEach((t, index) => {
          val[index] = convertIstToUtc(t);
        });

        return value;
      }

      if (typeof val === "string" || val instanceof Date) {
        value._value = convertIstToUtc(val);
        return value;
      }
    }

    logger.warn(`this is unhandled case ${JSON.stringify(value)}`);
    return value;
  },

  // called when retriving data to format it
  from: (value: Date | null | undefined): Date | null | undefined => {
    return convertUtcToIst(value);
  },
};
