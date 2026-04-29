export type ToolCategory = "time" | "date" | "countdown" | "utility";
export type ToolMode =
  | "addHours" | "addMinutes" | "subtractHours" | "subtractMinutes"
  | "futureHours" | "futureMinutes" | "pastHours" | "pastMinutes"
  | "daysUntil" | "daysBetween" | "addDays" | "subtractDays"
  | "hoursToMinutes" | "minutesToHours" | "secondsToMinutes"
  | "timeDuration" | "workHours" | "sleep";

export type ToolPageConfig = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  category: ToolCategory;
  mode: ToolMode;
  value?: number | string;
  related: { title: string; href: string }[];
  faq: { question: string; answer: string }[];
};

function numericFaq(baseQuestion: string, answer: string) {
  return [
    { question: baseQuestion, answer },
    { question: "Does this work on mobile devices?", answer: "Yes. This calculator works on phones, tablets, laptops, and desktop browsers." },
    { question: "Can I use this for scheduling?", answer: "Yes. It is useful for reminders, work shifts, meetings, travel plans, and day-to-day time calculations." },
    { question: "Why have a dedicated page for this query?", answer: "Dedicated pages match exact search intent better and make the site more useful for both visitors and search engines." },
  ];
}

function hourAddPage(value: number): ToolPageConfig {
  const titleUnit = `${value} ${value === 1 ? "Hour" : "Hours"}`;
  const slugUnit = `${value}-${value === 1 ? "hour" : "hours"}`;
  return {
    slug: `add-${slugUnit}-to-now`,
    title: `Add ${titleUnit} to Now`,
    description: `Instantly calculate what time it will be ${value} ${value === 1 ? "hour" : "hours"} from now with this free online calculator.`,
    keyword: `add ${value} ${value === 1 ? "hour" : "hours"} to now`,
    category: "time",
    mode: "addHours",
    value,
    related: [
      { title: `Subtract ${titleUnit} from Now`, href: `/subtract-${slugUnit}-from-now` },
      { title: `What Time Will It Be in ${titleUnit}?`, href: `/what-time-will-it-be-in-${slugUnit}` },
      { title: `What Time Was It ${titleUnit} Ago?`, href: `/what-time-was-it-${slugUnit}-ago` },
    ],
    faq: numericFaq(`What time will it be in ${value} ${value === 1 ? "hour" : "hours"}?`, `This calculator adds ${value} ${value === 1 ? "hour" : "hours"} to your current local time and shows the exact result instantly.`),
  };
}

function minuteAddPage(value: number): ToolPageConfig {
  return {
    slug: `add-${value}-minutes-to-now`,
    title: `Add ${value} Minutes to Now`,
    description: `See exactly what time it will be ${value} minutes from now with this free online calculator.`,
    keyword: `add ${value} minutes to now`,
    category: "time",
    mode: "addMinutes",
    value,
    related: [
      { title: `Subtract ${value} Minutes from Now`, href: `/subtract-${value}-minutes-from-now` },
      { title: `What Time Will It Be in ${value} Minutes?`, href: `/what-time-will-it-be-in-${value}-minutes` },
      { title: `What Time Was It ${value} Minutes Ago?`, href: `/what-time-was-it-${value}-minutes-ago` },
    ],
    faq: numericFaq(`What time will it be in ${value} minutes?`, `This calculator adds ${value} minutes to your current local time and displays the updated time right away.`),
  };
}

function hourSubtractPage(value: number): ToolPageConfig {
  const titleUnit = `${value} ${value === 1 ? "Hour" : "Hours"}`;
  const slugUnit = `${value}-${value === 1 ? "hour" : "hours"}`;
  return {
    slug: `subtract-${slugUnit}-from-now`,
    title: `Subtract ${titleUnit} from Now`,
    description: `Find out what time it was ${value} ${value === 1 ? "hour" : "hours"} ago with this free time subtraction calculator.`,
    keyword: `subtract ${value} ${value === 1 ? "hour" : "hours"} from now`,
    category: "time",
    mode: "subtractHours",
    value,
    related: [
      { title: `Add ${titleUnit} to Now`, href: `/add-${slugUnit}-to-now` },
      { title: `What Time Was It ${titleUnit} Ago?`, href: `/what-time-was-it-${slugUnit}-ago` },
      { title: `What Time Will It Be in ${titleUnit}?`, href: `/what-time-will-it-be-in-${slugUnit}` },
    ],
    faq: numericFaq(`What time was it ${value} ${value === 1 ? "hour" : "hours"} ago?`, `This page subtracts ${value} ${value === 1 ? "hour" : "hours"} from your current local time automatically.`),
  };
}

function minuteSubtractPage(value: number): ToolPageConfig {
  return {
    slug: `subtract-${value}-minutes-from-now`,
    title: `Subtract ${value} Minutes from Now`,
    description: `Calculate what time it was ${value} minutes ago with this free time subtraction calculator.`,
    keyword: `subtract ${value} minutes from now`,
    category: "time",
    mode: "subtractMinutes",
    value,
    related: [
      { title: `Add ${value} Minutes to Now`, href: `/add-${value}-minutes-to-now` },
      { title: `What Time Was It ${value} Minutes Ago?`, href: `/what-time-was-it-${value}-minutes-ago` },
      { title: `What Time Will It Be in ${value} Minutes?`, href: `/what-time-will-it-be-in-${value}-minutes` },
    ],
    faq: numericFaq(`What time was it ${value} minutes ago?`, `This tool subtracts ${value} minutes from the current local time and shows the answer instantly.`),
  };
}

function futureHourPage(value: number): ToolPageConfig {
  const titleUnit = `${value} ${value === 1 ? "Hour" : "Hours"}`;
  const slugUnit = `${value}-${value === 1 ? "hour" : "hours"}`;
  return {
    slug: `what-time-will-it-be-in-${slugUnit}`,
    title: `What Time Will It Be in ${titleUnit}?`,
    description: `Use this free calculator to find out what time it will be in ${value} ${value === 1 ? "hour" : "hours"}.`,
    keyword: `what time will it be in ${value} ${value === 1 ? "hour" : "hours"}`,
    category: "time",
    mode: "futureHours",
    value,
    related: [
      { title: `Add ${titleUnit} to Now`, href: `/add-${slugUnit}-to-now` },
      { title: `Subtract ${titleUnit} from Now`, href: `/subtract-${slugUnit}-from-now` },
      { title: `What Time Was It ${titleUnit} Ago?`, href: `/what-time-was-it-${slugUnit}-ago` },
    ],
    faq: numericFaq(`How do I calculate the time in ${titleUnit.toLowerCase()}?`, `This page takes the current local time and adds ${titleUnit.toLowerCase()} automatically.`),
  };
}

function futureMinutePage(value: number): ToolPageConfig {
  return {
    slug: `what-time-will-it-be-in-${value}-minutes`,
    title: `What Time Will It Be in ${value} Minutes?`,
    description: `See exactly what time it will be in ${value} minutes with this free calculator.`,
    keyword: `what time will it be in ${value} minutes`,
    category: "time",
    mode: "futureMinutes",
    value,
    related: [
      { title: `Add ${value} Minutes to Now`, href: `/add-${value}-minutes-to-now` },
      { title: `Subtract ${value} Minutes from Now`, href: `/subtract-${value}-minutes-from-now` },
      { title: `What Time Was It ${value} Minutes Ago?`, href: `/what-time-was-it-${value}-minutes-ago` },
    ],
    faq: numericFaq(`How do I calculate the time in ${value} minutes?`, `This page adds ${value} minutes to the current local time and shows the exact answer right away.`),
  };
}

function pastHourPage(value: number): ToolPageConfig {
  const titleUnit = `${value} ${value === 1 ? "Hour" : "Hours"}`;
  const slugUnit = `${value}-${value === 1 ? "hour" : "hours"}`;
  return {
    slug: `what-time-was-it-${slugUnit}-ago`,
    title: `What Time Was It ${titleUnit} Ago?`,
    description: `Use this free calculator to see what time it was ${value} ${value === 1 ? "hour" : "hours"} ago.`,
    keyword: `what time was it ${value} ${value === 1 ? "hour" : "hours"} ago`,
    category: "time",
    mode: "pastHours",
    value,
    related: [
      { title: `Subtract ${titleUnit} from Now`, href: `/subtract-${slugUnit}-from-now` },
      { title: `Add ${titleUnit} to Now`, href: `/add-${slugUnit}-to-now` },
      { title: `What Time Will It Be in ${titleUnit}?`, href: `/what-time-will-it-be-in-${slugUnit}` },
    ],
    faq: numericFaq(`How do I calculate the time ${titleUnit.toLowerCase()} ago?`, `This calculator subtracts ${titleUnit.toLowerCase()} from the current local time and displays the answer instantly.`),
  };
}

function pastMinutePage(value: number): ToolPageConfig {
  return {
    slug: `what-time-was-it-${value}-minutes-ago`,
    title: `What Time Was It ${value} Minutes Ago?`,
    description: `Find out what time it was ${value} minutes ago with this simple free calculator.`,
    keyword: `what time was it ${value} minutes ago`,
    category: "time",
    mode: "pastMinutes",
    value,
    related: [
      { title: `Subtract ${value} Minutes from Now`, href: `/subtract-${value}-minutes-from-now` },
      { title: `Add ${value} Minutes to Now`, href: `/add-${value}-minutes-to-now` },
      { title: `What Time Will It Be in ${value} Minutes?`, href: `/what-time-will-it-be-in-${value}-minutes` },
    ],
    faq: numericFaq(`How do I calculate the time ${value} minutes ago?`, `This page subtracts ${value} minutes from the current local time and gives the result right away.`),
  };
}

function addDaysPage(value: number): ToolPageConfig {
  return {
    slug: `add-${value}-days-to-date`,
    title: `Add ${value} Days to a Date`,
    description: `Use this date calculator to add ${value} days to any starting date.`,
    keyword: `add ${value} days to date`,
    category: "date",
    mode: "addDays",
    value,
    related: [
      { title: `Subtract ${value} Days from a Date`, href: `/subtract-${value}-days-from-date` },
      { title: "Days Between Dates", href: "/days-between-dates" },
      { title: "How Many Days Until Christmas 2026?", href: "/how-many-days-until-christmas-2026" },
    ],
    faq: numericFaq(`What date is ${value} days after a date?`, `This page lets you choose a starting date and adds ${value} days automatically.`),
  };
}

function subtractDaysPage(value: number): ToolPageConfig {
  return {
    slug: `subtract-${value}-days-from-date`,
    title: `Subtract ${value} Days from a Date`,
    description: `Use this date calculator to subtract ${value} days from any starting date.`,
    keyword: `subtract ${value} days from date`,
    category: "date",
    mode: "subtractDays",
    value,
    related: [
      { title: `Add ${value} Days to a Date`, href: `/add-${value}-days-to-date` },
      { title: "Days Between Dates", href: "/days-between-dates" },
      { title: "How Many Days Until January 1, 2027?", href: "/how-many-days-until-january-1-2027" },
    ],
    faq: numericFaq(`What date was ${value} days before a date?`, `This page lets you choose a starting date and subtracts ${value} days automatically.`),
  };
}

function monthDaySlug(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toLowerCase().replace(/,/g, "").replaceAll(" ", "-");
}
function monthDayTitle(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
function daysUntilDatePage(date: Date): ToolPageConfig {
  const formatted = monthDayTitle(date);
  const slug = monthDaySlug(date);
  const dateString = date.toISOString().slice(0, 10);
  return {
    slug: `how-many-days-until-${slug}`,
    title: `How Many Days Until ${formatted}?`,
    description: `Find out how many days are left until ${formatted} with this free countdown tool.`,
    keyword: `how many days until ${formatted.toLowerCase()}`,
    category: "countdown",
    mode: "daysUntil",
    value: dateString,
    related: [],
    faq: [
      { question: `How many days until ${formatted}?`, answer: `This page counts the number of full days between today and ${formatted}.` },
      { question: "Does the countdown update automatically?", answer: "Yes. The countdown recalculates each time the page loads." },
      { question: "Can I use this for planning?", answer: "Yes. Countdown pages are useful for holidays, birthdays, launches, travel, and school deadlines." },
      { question: "Why does this page exist for one date?", answer: "Specific date pages match exact searches and are more useful than making visitors enter the date manually every time." },
    ],
  };
}

export const CORE_UTILITY_PAGES: ToolPageConfig[] = [
  {
    slug: "days-between-dates",
    title: "Days Between Dates",
    description: "Calculate the exact number of days between any two dates with this free date-difference calculator.",
    keyword: "days between dates",
    category: "date",
    mode: "daysBetween",
    related: [
      { title: "Add 30 Days to a Date", href: "/add-30-days-to-date" },
      { title: "Subtract 30 Days from a Date", href: "/subtract-30-days-from-date" },
      { title: "How Many Days Until January 1, 2027?", href: "/how-many-days-until-january-1-2027" },
    ],
    faq: [
      { question: "How do I calculate days between two dates?", answer: "Enter a start date and end date, and this calculator returns the full day difference instantly." },
      { question: "Can I use this for project planning?", answer: "Yes. It is useful for deadlines, contracts, billing cycles, events, and travel planning." },
      { question: "Does it handle date changes across years?", answer: "Yes. The calculator works across months and years automatically." },
      { question: "Why use this instead of counting manually?", answer: "Manual counting is slow and easy to get wrong. This tool is faster and more accurate." },
    ],
  },
  {
    slug: "hours-to-minutes-calculator",
    title: "Hours to Minutes Calculator",
    description: "Convert hours to minutes instantly with this simple free conversion tool.",
    keyword: "hours to minutes calculator",
    category: "utility",
    mode: "hoursToMinutes",
    related: [
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" },
      { title: "Seconds to Minutes Calculator", href: "/seconds-to-minutes-calculator" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" },
    ],
    faq: [
      { question: "How many minutes are in an hour?", answer: "There are 60 minutes in 1 hour." },
      { question: "Can I convert decimal hours with this tool?", answer: "Yes. The tool can be used for whole numbers and decimal values." },
      { question: "Why use an hours to minutes calculator?", answer: "It is useful for work logs, scheduling, time studies, and planning." },
      { question: "Is the result instant?", answer: "Yes. The result updates immediately when you change the input." },
    ],
  },
  {
    slug: "minutes-to-hours-calculator",
    title: "Minutes to Hours Calculator",
    description: "Convert minutes to hours instantly with this free conversion calculator.",
    keyword: "minutes to hours calculator",
    category: "utility",
    mode: "minutesToHours",
    related: [
      { title: "Hours to Minutes Calculator", href: "/hours-to-minutes-calculator" },
      { title: "Seconds to Minutes Calculator", href: "/seconds-to-minutes-calculator" },
      { title: "Work Hours Calculator", href: "/work-hours-calculator" },
    ],
    faq: [
      { question: "How do I convert minutes to hours?", answer: "Divide the number of minutes by 60. This calculator does that for you automatically." },
      { question: "Can I use this for payroll and timesheets?", answer: "Yes. It is useful for turning minute totals into hourly values." },
      { question: "Does it handle large numbers?", answer: "Yes. You can use large or small minute values." },
      { question: "Why use a calculator instead of mental math?", answer: "It is faster, easier, and more reliable for repeated conversions." },
    ],
  },
  {
    slug: "seconds-to-minutes-calculator",
    title: "Seconds to Minutes Calculator",
    description: "Convert seconds to minutes instantly with this fast free calculator.",
    keyword: "seconds to minutes calculator",
    category: "utility",
    mode: "secondsToMinutes",
    related: [
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" },
      { title: "Hours to Minutes Calculator", href: "/hours-to-minutes-calculator" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" },
    ],
    faq: [
      { question: "How many seconds are in a minute?", answer: "There are 60 seconds in 1 minute." },
      { question: "Can I use this for video and workout timing?", answer: "Yes. It is helpful for workouts, media, timers, and analytics." },
      { question: "Does the result update automatically?", answer: "Yes. Change the value and the result updates immediately." },
      { question: "Why use this conversion tool?", answer: "It makes time conversions faster and reduces errors." },
    ],
  },
  {
    slug: "time-duration-calculator",
    title: "Time Duration Calculator",
    description: "Calculate the time difference between two times with this free duration calculator.",
    keyword: "time duration calculator",
    category: "utility",
    mode: "timeDuration",
    related: [
      { title: "Work Hours Calculator", href: "/work-hours-calculator" },
      { title: "Days Between Dates", href: "/days-between-dates" },
      { title: "Hours to Minutes Calculator", href: "/hours-to-minutes-calculator" },
    ],
    faq: [
      { question: "How do I calculate time duration?", answer: "Enter a start time and an end time, and the tool returns the total duration." },
      { question: "Can it handle overnight time ranges?", answer: "Yes. The calculator supports ranges that cross midnight." },
      { question: "Is this useful for shift calculations?", answer: "Yes. It is useful for work, travel, meetings, and event scheduling." },
      { question: "Why use a dedicated duration calculator?", answer: "It is faster and more accurate than counting time manually." },
    ],
  },
  {
    slug: "work-hours-calculator",
    title: "Work Hours Calculator",
    description: "Calculate paid hours between a start time and end time, including breaks, with this free work hours calculator.",
    keyword: "work hours calculator",
    category: "utility",
    mode: "workHours",
    related: [
      { title: "Time Duration Calculator", href: "/time-duration-calculator" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" },
      { title: "Hours to Minutes Calculator", href: "/hours-to-minutes-calculator" },
    ],
    faq: [
      { question: "How do I calculate work hours after breaks?", answer: "Enter your shift start, shift end, and break minutes. The calculator returns your paid hours." },
      { question: "Can I use this for overnight shifts?", answer: "Yes. It supports shifts that pass midnight." },
      { question: "Is this helpful for payroll checks?", answer: "Yes. It is useful for timesheets, payroll verification, and freelance logging." },
      { question: "Why use this instead of a spreadsheet?", answer: "It is faster for quick checks and easier for everyday use." },
    ],
  },
  {
    slug: "sleep-calculator",
    title: "Sleep Calculator",
    description: "Use this sleep calculator to find suggested bedtimes based on sleep cycles and your target wake-up time.",
    keyword: "sleep calculator",
    category: "utility",
    mode: "sleep",
    related: [
      { title: "Work Hours Calculator", href: "/work-hours-calculator" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" },
      { title: "Days Between Dates", href: "/days-between-dates" },
    ],
    faq: [
      { question: "How does a sleep calculator work?", answer: "It estimates bedtimes based on common sleep-cycle lengths and a chosen wake-up time." },
      { question: "Can this help with bedtime planning?", answer: "Yes. It is useful for school, work, travel, and daily routines." },
      { question: "Why does it show multiple bedtimes?", answer: "Multiple options help you choose between different cycle counts." },
      { question: "Is this medical advice?", answer: "No. It is a planning tool, not medical advice." },
    ],
  },
];

export const SPECIAL_COUNTDOWNS: ToolPageConfig[] = [
  {
    slug: "how-many-days-until-christmas-2026",
    title: "How Many Days Until Christmas 2026?",
    description: "Track exactly how many days are left until Christmas 2026 with this free countdown page.",
    keyword: "how many days until christmas 2026",
    category: "countdown",
    mode: "daysUntil",
    value: "2026-12-25",
    related: [
      { title: "How Many Days Until January 1, 2027?", href: "/how-many-days-until-january-1-2027" },
      { title: "How Many Days Until Halloween 2026?", href: "/how-many-days-until-halloween-2026" },
      { title: "How Many Days Until Thanksgiving 2026?", href: "/how-many-days-until-thanksgiving-2026" },
    ],
    faq: [
      { question: "How many days until Christmas 2026?", answer: "This countdown shows the exact number of days remaining until Christmas Day 2026." },
      { question: "Does the Christmas countdown include today?", answer: "The page counts full days remaining from today until Christmas 2026." },
      { question: "Can I use this for holiday planning?", answer: "Yes. It is useful for travel, gifts, budgeting, events, and seasonal planning." },
      { question: "Why use a dedicated Christmas page?", answer: "Christmas is a high-interest seasonal search, so a dedicated page gives a faster answer and a better visitor experience." },
    ],
  },
  {
    slug: "how-many-days-until-january-1-2027",
    title: "How Many Days Until January 1, 2027?",
    description: "See how many days remain until New Year's Day 2027 with this simple countdown tool.",
    keyword: "how many days until january 1 2027",
    category: "countdown",
    mode: "daysUntil",
    value: "2027-01-01",
    related: [
      { title: "How Many Days Until Christmas 2026?", href: "/how-many-days-until-christmas-2026" },
      { title: "How Many Days Until December 31, 2026?", href: "/how-many-days-until-december-31-2026" },
      { title: "Days Between Dates", href: "/days-between-dates" },
    ],
    faq: [
      { question: "How many days until January 1, 2027?", answer: "This page shows the exact number of days left until the first day of 2027." },
      { question: "Can I use this for New Year planning?", answer: "Yes. It is useful for planning travel, goals, events, and deadlines tied to the new year." },
      { question: "Does this update every day?", answer: "Yes. The page recalculates the countdown automatically whenever it loads." },
      { question: "Why build a dedicated New Year page?", answer: "New Year countdowns get searched often, and a dedicated page answers the query immediately." },
    ],
  },
  {
    slug: "how-many-days-until-halloween-2026",
    title: "How Many Days Until Halloween 2026?",
    description: "Use this free countdown to see how many days are left until Halloween 2026.",
    keyword: "how many days until halloween 2026",
    category: "countdown",
    mode: "daysUntil",
    value: "2026-10-31",
    related: [
      { title: "How Many Days Until Christmas 2026?", href: "/how-many-days-until-christmas-2026" },
      { title: "How Many Days Until Thanksgiving 2026?", href: "/how-many-days-until-thanksgiving-2026" },
      { title: "How Many Days Until October 31, 2026?", href: "/how-many-days-until-october-31-2026" },
    ],
    faq: [
      { question: "How many days until Halloween 2026?", answer: "This page counts the days remaining until Halloween 2026." },
      { question: "Can I use this for party planning?", answer: "Yes. It helps with party planning, costumes, travel, and seasonal shopping." },
      { question: "Does it account for leap years automatically?", answer: "Yes. The countdown uses real calendar dates." },
      { question: "Why have both a named event page and a date page?", answer: "People search both ways, so covering both improves usefulness and SEO reach." },
    ],
  },
  {
    slug: "how-many-days-until-thanksgiving-2026",
    title: "How Many Days Until Thanksgiving 2026?",
    description: "Find out how many days are left until Thanksgiving 2026 with this simple countdown tool.",
    keyword: "how many days until thanksgiving 2026",
    category: "countdown",
    mode: "daysUntil",
    value: "2026-11-26",
    related: [
      { title: "How Many Days Until Halloween 2026?", href: "/how-many-days-until-halloween-2026" },
      { title: "How Many Days Until Christmas 2026?", href: "/how-many-days-until-christmas-2026" },
      { title: "How Many Days Until November 26, 2026?", href: "/how-many-days-until-november-26-2026" },
    ],
    faq: [
      { question: "How many days until Thanksgiving 2026?", answer: "This page counts the number of full days left until Thanksgiving 2026." },
      { question: "Is this useful for travel planning?", answer: "Yes. It is helpful for flights, family plans, menus, and holiday schedules." },
      { question: "Will this countdown change automatically?", answer: "Yes. It updates each day when the page loads." },
      { question: "Why use a dedicated Thanksgiving page?", answer: "Many visitors want a direct countdown for that specific holiday without entering dates manually." },
    ],
  },
];

const ADD_HOUR_VALUES = Array.from({ length: 24 }, (_, i) => i + 1).concat([30, 36, 48, 60, 72, 84, 96]);
const ADD_MINUTE_VALUES = [5,10,15,20,25,30,35,40,45,50,55,60,75,90,105,120,135,150,180,210,240,270,300,330,360,420,480,540,600,720];
const SUBTRACT_HOUR_VALUES = Array.from({ length: 18 }, (_, i) => i + 1).concat([24, 36, 48, 60, 72]);
const SUBTRACT_MINUTE_VALUES = [5,10,15,20,25,30,45,60,75,90,120,180,240,300,360,480];
const FUTURE_HOUR_VALUES = Array.from({ length: 18 }, (_, i) => i + 1).concat([24, 36, 48, 60, 72]);
const FUTURE_MINUTE_VALUES = [5,10,15,20,25,30,45,60,75,90,120,180,240,300,360,480];
const PAST_HOUR_VALUES = Array.from({ length: 15 }, (_, i) => i + 1).concat([24,36,48,60]);
const PAST_MINUTE_VALUES = [5,10,15,20,30,45,60,90,120,180,240,300,360];
const DATE_SHIFT_VALUES = [1,3,5,7,10,14,21,30,45,60,90,120,150,180,270,365];

function buildDatePagesForYear(year: number) {
  const pages: ToolPageConfig[] = [];
  for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= 31; day++) {
      const d = new Date(year, month, day);
      if (d.getMonth() === month) pages.push(daysUntilDatePage(d));
    }
  }
  return pages;
}


const FIRST_TEN_SEO_PAGES: ToolPageConfig[] = [
  {
    slug: "30-minutes-from-now",
    title: "30 Minutes From Now",
    description: "Find out what time it will be 30 minutes from now with this quick calculator.",
    keyword: "30 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 30,
    related: [
      { title: "45 Minutes From Now", href: "/45-minutes-from-now" },
      { title: "Add 30 Minutes to Now", href: "/add-30-minutes-to-now" },
      { title: "What Time Will It Be in 30 Minutes?", href: "/what-time-will-it-be-in-30-minutes" }
    ],
    faq: [
      { question: "What time is 30 minutes from now?", answer: "This page adds 30 minutes to your current local time." },
      { question: "Is 30 minutes half an hour?", answer: "Yes. 30 minutes is one half of an hour." },
      { question: "Can I use this for timers?", answer: "Yes. It is useful for short reminders, breaks, cooking, workouts, and tasks." },
      { question: "Does the result update?", answer: "Yes. Reload the page to recalculate from the current time." }
    ],
  },
  {
    slug: "45-minutes-from-now",
    title: "45 Minutes From Now",
    description: "Calculate what time it will be 45 minutes from now instantly.",
    keyword: "45 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 45,
    related: [
      { title: "30 Minutes From Now", href: "/30-minutes-from-now" },
      { title: "90 Minutes From Now", href: "/90-minutes-from-now" },
      { title: "Add 45 Minutes to Now", href: "/add-45-minutes-to-now" }
    ],
    faq: [
      { question: "What time is 45 minutes from now?", answer: "This calculator adds 45 minutes to your current local time." },
      { question: "How much of an hour is 45 minutes?", answer: "45 minutes is three quarters of an hour." },
      { question: "What is this useful for?", answer: "It is useful for appointments, breaks, cooking times, reminders, and travel timing." },
      { question: "Does it work on mobile?", answer: "Yes. It works in normal mobile browsers." }
    ],
  },
  {
    slug: "90-minutes-from-now",
    title: "90 Minutes From Now",
    description: "Find out what time it will be 90 minutes from now with this simple time calculator.",
    keyword: "90 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 90,
    related: [
      { title: "45 Minutes From Now", href: "/45-minutes-from-now" },
      { title: "120 Minutes From Now", href: "/120-minutes-from-now" },
      { title: "90 Minutes to Hours", href: "/90-minutes-to-hours" }
    ],
    faq: [
      { question: "What time is 90 minutes from now?", answer: "This page adds 90 minutes to the current time." },
      { question: "How many hours is 90 minutes?", answer: "90 minutes is 1.5 hours." },
      { question: "Is this useful for sleep cycles?", answer: "Yes. 90 minutes is often used as a common sleep-cycle estimate." },
      { question: "Does it account for crossing midnight?", answer: "Yes. The result will still calculate correctly if it passes midnight." }
    ],
  },
  {
    slug: "120-minutes-from-now",
    title: "120 Minutes From Now",
    description: "Calculate what time it will be 120 minutes from now.",
    keyword: "120 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 120,
    related: [
      { title: "90 Minutes From Now", href: "/90-minutes-from-now" },
      { title: "120 Minutes to Hours", href: "/120-minutes-to-hours" },
      { title: "What Time Will It Be in 2 Hours?", href: "/what-time-will-it-be-in-2-hours" }
    ],
    faq: [
      { question: "What time is 120 minutes from now?", answer: "This page adds 120 minutes to your current local time." },
      { question: "How many hours is 120 minutes?", answer: "120 minutes is 2 hours." },
      { question: "Is this the same as 2 hours from now?", answer: "Yes. 120 minutes from now is the same as 2 hours from now." },
      { question: "Can I use this for planning?", answer: "Yes. It is useful for reminders, appointments, and travel timing." }
    ],
  },
  {
    slug: "9am-to-5pm-hours",
    title: "9AM to 5PM Hours",
    description: "Calculate how many hours are between 9AM and 5PM, including common break examples.",
    keyword: "9am to 5pm hours",
    category: "utility",
    mode: "workHours",
    related: [
      { title: "Work Hours Calculator", href: "/work-hours-calculator" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "How many hours is 9AM to 5PM?", answer: "9AM to 5PM is 8 hours total." },
      { question: "How many paid hours is 9AM to 5PM with a 1-hour break?", answer: "With a 1-hour unpaid break, 9AM to 5PM is 7 paid hours." },
      { question: "Is 9AM to 5PM a full workday?", answer: "It is commonly treated as a standard 8-hour workday before unpaid breaks." },
      { question: "Can this calculator handle other shifts?", answer: "Yes. Use the work hours calculator for custom start times, end times, and breaks." }
    ],
  },
  {
    slug: "120-minutes-to-hours",
    title: "120 Minutes to Hours",
    description: "Convert 120 minutes to hours instantly with this free time conversion page.",
    keyword: "120 minutes to hours",
    category: "utility",
    mode: "minutesToHours",
    value: 120,
    related: [
      { title: "90 Minutes From Now", href: "/90-minutes-from-now" },
      { title: "120 Minutes From Now", href: "/120-minutes-from-now" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "How many hours is 120 minutes?", answer: "120 minutes is 2 hours." },
      { question: "How do you convert 120 minutes to hours?", answer: "Divide 120 by 60. The result is 2 hours." },
      { question: "Is 120 minutes the same as 2 hours?", answer: "Yes. 120 minutes equals 2 hours." },
      { question: "What is this useful for?", answer: "This conversion is useful for timesheets, scheduling, study blocks, and planning." }
    ],
  },
  {
    slug: "days-until-christmas",
    title: "Days Until Christmas",
    description: "See how many days are left until Christmas with this free countdown page.",
    keyword: "days until Christmas",
    category: "countdown",
    mode: "daysUntil",
    value: "2026-12-25",
    related: [
      { title: "How Many Days Until Christmas 2026?", href: "/how-many-days-until-christmas-2026" },
      { title: "How Many Days Until Thanksgiving 2026?", href: "/how-many-days-until-thanksgiving-2026" },
      { title: "Days Between Dates", href: "/days-between-dates" }
    ],
    faq: [
      { question: "How many days until Christmas?", answer: "This page counts the number of days remaining until Christmas." },
      { question: "Can I use this for holiday planning?", answer: "Yes. It is useful for gift planning, travel, meals, events, and seasonal reminders." },
      { question: "Does the countdown update?", answer: "Yes. It updates when the page loads." },
      { question: "Does this include Christmas 2026?", answer: "This page is currently configured for Christmas 2026." }
    ],
  }
];

export const TOOL_PAGES: ToolPageConfig[] = [
  ...FIRST_TEN_SEO_PAGES,
  ...ADD_HOUR_VALUES.map(hourAddPage),
  ...ADD_MINUTE_VALUES.map(minuteAddPage),
  ...SUBTRACT_HOUR_VALUES.map(hourSubtractPage),
  ...SUBTRACT_MINUTE_VALUES.map(minuteSubtractPage),
  ...FUTURE_HOUR_VALUES.map(futureHourPage),
  ...FUTURE_MINUTE_VALUES.map(futureMinutePage),
  ...PAST_HOUR_VALUES.map(pastHourPage),
  ...PAST_MINUTE_VALUES.map(pastMinutePage),
  ...DATE_SHIFT_VALUES.map(addDaysPage),
  ...DATE_SHIFT_VALUES.map(subtractDaysPage),
  ...CORE_UTILITY_PAGES,
  ...SPECIAL_COUNTDOWNS,
  ...buildDatePagesForYear(2026),
  ...buildDatePagesForYear(2027),
];

export function getToolBySlug(slug: string) {
  return TOOL_PAGES.find((tool) => tool.slug === slug);
}

export const CATEGORY_COUNTS = {
  time: TOOL_PAGES.filter((p) => p.category === "time").length,
  date: TOOL_PAGES.filter((p) => p.category === "date").length,
  countdown: TOOL_PAGES.filter((p) => p.category === "countdown").length,
  utility: TOOL_PAGES.filter((p) => p.category === "utility").length,
};

export const FEATURED_SLUGS = [
  "add-8-hours-to-now",
  "subtract-8-hours-from-now",
  "what-time-will-it-be-in-3-hours",
  "what-time-was-it-3-hours-ago",
  "days-between-dates",
  "add-30-days-to-date",
  "subtract-30-days-from-date",
  "how-many-days-until-christmas-2026",
  "how-many-days-until-january-1-2027",
  "work-hours-calculator",
  "time-duration-calculator",
  "sleep-calculator",
];

