import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

export default ({ $dayjs }) => {
  const config = {
    thresholds: [
      { l: "s", r: 1 },
      { l: "ss", r: 59, d: "second" },
      { l: "m", r: 1 },
      { l: "mm", r: 59, d: "minute" },
      { l: "h", r: 1 },
      { l: "hh", r: 23, d: "hour" },
      { l: "d", r: 1 },
      { l: "dd", r: 29, d: "day" },
      { l: "M", r: 1 },
      { l: "MM", r: 11, d: "month" },
      { l: "y" },
      { l: "yy", d: "year" },
    ],
    rounding: Math.round,
  };
  $dayjs.extend(relativeTime, config);

  $dayjs.extend(updateLocale);
  $dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%d seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
  });
};
