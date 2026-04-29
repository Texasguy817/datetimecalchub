// Paste this at the TOP of your toolPages.ts file

function generateSmartLinks(slug: string, value?: number) {
  const links = [];

  // Minutes cluster
  if (slug.includes("minutes-from-now") && value) {
    const nearby = [value - 10, value + 10, value + 25].filter(v => v > 0);
    nearby.forEach(v => {
      links.push({
        title: `${v} Minutes From Now`,
        href: `/${v}-minutes-from-now`
      });
    });

    if (value >= 60) {
      const hours = value / 60;
      if (Number.isInteger(hours)) {
        links.push({
          title: `What Time Will It Be in ${hours} Hours?`,
          href: `/what-time-will-it-be-in-${hours}-hours`
        });
      }
    }
  }

  if (slug.includes("what-time-will-it-be-in") && value) {
    [value - 1, value + 1, value + 2].forEach(h => {
      if (h > 0) {
        links.push({
          title: `What Time Will It Be in ${h} Hours?`,
          href: `/what-time-will-it-be-in-${h}-hours`
        });
      }
    });

    links.push({
      title: `${value * 60} Minutes From Now`,
      href: `/${value * 60}-minutes-from-now`
    });
  }

  if (slug.includes("minutes-to-hours") && value) {
    links.push({
      title: `${value} Minutes From Now`,
      href: `/${value}-minutes-from-now`
    });
  }

  links.push({
    title: "TimeCalcHub Home",
    href: "/"
  });

  return links.slice(0, 6);
}

// HOW TO USE:
// Replace each page's "related: [...]" with:
// related: generateSmartLinks(slug, value),

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

const NEXT_FIFTY_SEO_PAGES: ToolPageConfig[] = [
  {
    slug: "5-minutes-from-now",
    title: "5 Minutes From Now",
    description: "Find out what time it will be 5 minutes from now with this quick time calculator.",
    keyword: "5 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 5,
    related: [
      { title: "Add 5 Minutes to Now", href: "/add-5-minutes-to-now" },
      { title: "What Time Will It Be in 5 Minutes?", href: "/what-time-will-it-be-in-5-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 5 minutes from now?", answer: "This page adds 5 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "10-minutes-from-now",
    title: "10 Minutes From Now",
    description: "Find out what time it will be 10 minutes from now with this quick time calculator.",
    keyword: "10 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 10,
    related: [
      { title: "Add 10 Minutes to Now", href: "/add-10-minutes-to-now" },
      { title: "What Time Will It Be in 10 Minutes?", href: "/what-time-will-it-be-in-10-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 10 minutes from now?", answer: "This page adds 10 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "15-minutes-from-now",
    title: "15 Minutes From Now",
    description: "Find out what time it will be 15 minutes from now with this quick time calculator.",
    keyword: "15 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 15,
    related: [
      { title: "Add 15 Minutes to Now", href: "/add-15-minutes-to-now" },
      { title: "What Time Will It Be in 15 Minutes?", href: "/what-time-will-it-be-in-15-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 15 minutes from now?", answer: "This page adds 15 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "20-minutes-from-now",
    title: "20 Minutes From Now",
    description: "Find out what time it will be 20 minutes from now with this quick time calculator.",
    keyword: "20 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 20,
    related: [
      { title: "Add 20 Minutes to Now", href: "/add-20-minutes-to-now" },
      { title: "What Time Will It Be in 20 Minutes?", href: "/what-time-will-it-be-in-20-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 20 minutes from now?", answer: "This page adds 20 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "25-minutes-from-now",
    title: "25 Minutes From Now",
    description: "Find out what time it will be 25 minutes from now with this quick time calculator.",
    keyword: "25 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 25,
    related: [
      { title: "Add 25 Minutes to Now", href: "/add-25-minutes-to-now" },
      { title: "What Time Will It Be in 25 Minutes?", href: "/what-time-will-it-be-in-25-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 25 minutes from now?", answer: "This page adds 25 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "35-minutes-from-now",
    title: "35 Minutes From Now",
    description: "Find out what time it will be 35 minutes from now with this quick time calculator.",
    keyword: "35 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 35,
    related: [
      { title: "Add 35 Minutes to Now", href: "/add-35-minutes-to-now" },
      { title: "What Time Will It Be in 35 Minutes?", href: "/what-time-will-it-be-in-35-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 35 minutes from now?", answer: "This page adds 35 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "40-minutes-from-now",
    title: "40 Minutes From Now",
    description: "Find out what time it will be 40 minutes from now with this quick time calculator.",
    keyword: "40 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 40,
    related: [
      { title: "Add 40 Minutes to Now", href: "/add-40-minutes-to-now" },
      { title: "What Time Will It Be in 40 Minutes?", href: "/what-time-will-it-be-in-40-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 40 minutes from now?", answer: "This page adds 40 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "50-minutes-from-now",
    title: "50 Minutes From Now",
    description: "Find out what time it will be 50 minutes from now with this quick time calculator.",
    keyword: "50 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 50,
    related: [
      { title: "Add 50 Minutes to Now", href: "/add-50-minutes-to-now" },
      { title: "What Time Will It Be in 50 Minutes?", href: "/what-time-will-it-be-in-50-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 50 minutes from now?", answer: "This page adds 50 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "60-minutes-from-now",
    title: "60 Minutes From Now",
    description: "Find out what time it will be 60 minutes from now with this quick time calculator.",
    keyword: "60 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 60,
    related: [
      { title: "Add 60 Minutes to Now", href: "/add-60-minutes-to-now" },
      { title: "What Time Will It Be in 60 Minutes?", href: "/what-time-will-it-be-in-60-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 60 minutes from now?", answer: "This page adds 60 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "75-minutes-from-now",
    title: "75 Minutes From Now",
    description: "Find out what time it will be 75 minutes from now with this quick time calculator.",
    keyword: "75 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 75,
    related: [
      { title: "Add 75 Minutes to Now", href: "/add-75-minutes-to-now" },
      { title: "What Time Will It Be in 75 Minutes?", href: "/what-time-will-it-be-in-75-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 75 minutes from now?", answer: "This page adds 75 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "100-minutes-from-now",
    title: "100 Minutes From Now",
    description: "Find out what time it will be 100 minutes from now with this quick time calculator.",
    keyword: "100 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 100,
    related: [
      { title: "Add 100 Minutes to Now", href: "/add-100-minutes-to-now" },
      { title: "What Time Will It Be in 100 Minutes?", href: "/what-time-will-it-be-in-100-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 100 minutes from now?", answer: "This page adds 100 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "110-minutes-from-now",
    title: "110 Minutes From Now",
    description: "Find out what time it will be 110 minutes from now with this quick time calculator.",
    keyword: "110 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 110,
    related: [
      { title: "Add 110 Minutes to Now", href: "/add-110-minutes-to-now" },
      { title: "What Time Will It Be in 110 Minutes?", href: "/what-time-will-it-be-in-110-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 110 minutes from now?", answer: "This page adds 110 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "130-minutes-from-now",
    title: "130 Minutes From Now",
    description: "Find out what time it will be 130 minutes from now with this quick time calculator.",
    keyword: "130 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 130,
    related: [
      { title: "Add 130 Minutes to Now", href: "/add-130-minutes-to-now" },
      { title: "What Time Will It Be in 130 Minutes?", href: "/what-time-will-it-be-in-130-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 130 minutes from now?", answer: "This page adds 130 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "140-minutes-from-now",
    title: "140 Minutes From Now",
    description: "Find out what time it will be 140 minutes from now with this quick time calculator.",
    keyword: "140 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 140,
    related: [
      { title: "Add 140 Minutes to Now", href: "/add-140-minutes-to-now" },
      { title: "What Time Will It Be in 140 Minutes?", href: "/what-time-will-it-be-in-140-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 140 minutes from now?", answer: "This page adds 140 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "160-minutes-from-now",
    title: "160 Minutes From Now",
    description: "Find out what time it will be 160 minutes from now with this quick time calculator.",
    keyword: "160 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 160,
    related: [
      { title: "Add 160 Minutes to Now", href: "/add-160-minutes-to-now" },
      { title: "What Time Will It Be in 160 Minutes?", href: "/what-time-will-it-be-in-160-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 160 minutes from now?", answer: "This page adds 160 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "180-minutes-from-now",
    title: "180 Minutes From Now",
    description: "Find out what time it will be 180 minutes from now with this quick time calculator.",
    keyword: "180 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 180,
    related: [
      { title: "Add 180 Minutes to Now", href: "/add-180-minutes-to-now" },
      { title: "What Time Will It Be in 180 Minutes?", href: "/what-time-will-it-be-in-180-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 180 minutes from now?", answer: "This page adds 180 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "200-minutes-from-now",
    title: "200 Minutes From Now",
    description: "Find out what time it will be 200 minutes from now with this quick time calculator.",
    keyword: "200 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 200,
    related: [
      { title: "Add 200 Minutes to Now", href: "/add-200-minutes-to-now" },
      { title: "What Time Will It Be in 200 Minutes?", href: "/what-time-will-it-be-in-200-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 200 minutes from now?", answer: "This page adds 200 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "240-minutes-from-now",
    title: "240 Minutes From Now",
    description: "Find out what time it will be 240 minutes from now with this quick time calculator.",
    keyword: "240 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 240,
    related: [
      { title: "Add 240 Minutes to Now", href: "/add-240-minutes-to-now" },
      { title: "What Time Will It Be in 240 Minutes?", href: "/what-time-will-it-be-in-240-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 240 minutes from now?", answer: "This page adds 240 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "300-minutes-from-now",
    title: "300 Minutes From Now",
    description: "Find out what time it will be 300 minutes from now with this quick time calculator.",
    keyword: "300 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 300,
    related: [
      { title: "Add 300 Minutes to Now", href: "/add-300-minutes-to-now" },
      { title: "What Time Will It Be in 300 Minutes?", href: "/what-time-will-it-be-in-300-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 300 minutes from now?", answer: "This page adds 300 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "360-minutes-from-now",
    title: "360 Minutes From Now",
    description: "Find out what time it will be 360 minutes from now with this quick time calculator.",
    keyword: "360 minutes from now",
    category: "time",
    mode: "futureMinutes",
    value: 360,
    related: [
      { title: "Add 360 Minutes to Now", href: "/add-360-minutes-to-now" },
      { title: "What Time Will It Be in 360 Minutes?", href: "/what-time-will-it-be-in-360-minutes" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "What time is 360 minutes from now?", answer: "This page adds 360 minutes to your current local time and shows the result instantly." },
      { question: "Can this cross into the next hour?", answer: "Yes. The calculator handles hour changes and day changes automatically." },
      { question: "What is this useful for?", answer: "It is useful for reminders, breaks, cooking, workouts, appointments, travel timing, and quick planning." },
      { question: "Does the result update?", answer: "Yes. Reload the page to calculate again from the current time." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-4-hours",
    title: "What Time Will It Be in 4 Hours?",
    description: "Calculate what time it will be in 4 hours from now instantly.",
    keyword: "what time will it be in 4 hours",
    category: "time",
    mode: "futureHours",
    value: 4,
    related: [
      { title: "Add 4 Hours to Now", href: "/add-4-hours-to-now" },
      { title: "What Time Was It 4 Hours Ago?", href: "/what-time-was-it-4-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 4 hours?", answer: "This page adds 4 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-5-hours",
    title: "What Time Will It Be in 5 Hours?",
    description: "Calculate what time it will be in 5 hours from now instantly.",
    keyword: "what time will it be in 5 hours",
    category: "time",
    mode: "futureHours",
    value: 5,
    related: [
      { title: "Add 5 Hours to Now", href: "/add-5-hours-to-now" },
      { title: "What Time Was It 5 Hours Ago?", href: "/what-time-was-it-5-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 5 hours?", answer: "This page adds 5 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-6-hours",
    title: "What Time Will It Be in 6 Hours?",
    description: "Calculate what time it will be in 6 hours from now instantly.",
    keyword: "what time will it be in 6 hours",
    category: "time",
    mode: "futureHours",
    value: 6,
    related: [
      { title: "Add 6 Hours to Now", href: "/add-6-hours-to-now" },
      { title: "What Time Was It 6 Hours Ago?", href: "/what-time-was-it-6-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 6 hours?", answer: "This page adds 6 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-7-hours",
    title: "What Time Will It Be in 7 Hours?",
    description: "Calculate what time it will be in 7 hours from now instantly.",
    keyword: "what time will it be in 7 hours",
    category: "time",
    mode: "futureHours",
    value: 7,
    related: [
      { title: "Add 7 Hours to Now", href: "/add-7-hours-to-now" },
      { title: "What Time Was It 7 Hours Ago?", href: "/what-time-was-it-7-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 7 hours?", answer: "This page adds 7 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-8-hours",
    title: "What Time Will It Be in 8 Hours?",
    description: "Calculate what time it will be in 8 hours from now instantly.",
    keyword: "what time will it be in 8 hours",
    category: "time",
    mode: "futureHours",
    value: 8,
    related: [
      { title: "Add 8 Hours to Now", href: "/add-8-hours-to-now" },
      { title: "What Time Was It 8 Hours Ago?", href: "/what-time-was-it-8-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 8 hours?", answer: "This page adds 8 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-9-hours",
    title: "What Time Will It Be in 9 Hours?",
    description: "Calculate what time it will be in 9 hours from now instantly.",
    keyword: "what time will it be in 9 hours",
    category: "time",
    mode: "futureHours",
    value: 9,
    related: [
      { title: "Add 9 Hours to Now", href: "/add-9-hours-to-now" },
      { title: "What Time Was It 9 Hours Ago?", href: "/what-time-was-it-9-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 9 hours?", answer: "This page adds 9 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-10-hours",
    title: "What Time Will It Be in 10 Hours?",
    description: "Calculate what time it will be in 10 hours from now instantly.",
    keyword: "what time will it be in 10 hours",
    category: "time",
    mode: "futureHours",
    value: 10,
    related: [
      { title: "Add 10 Hours to Now", href: "/add-10-hours-to-now" },
      { title: "What Time Was It 10 Hours Ago?", href: "/what-time-was-it-10-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 10 hours?", answer: "This page adds 10 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-11-hours",
    title: "What Time Will It Be in 11 Hours?",
    description: "Calculate what time it will be in 11 hours from now instantly.",
    keyword: "what time will it be in 11 hours",
    category: "time",
    mode: "futureHours",
    value: 11,
    related: [
      { title: "Add 11 Hours to Now", href: "/add-11-hours-to-now" },
      { title: "What Time Was It 11 Hours Ago?", href: "/what-time-was-it-11-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 11 hours?", answer: "This page adds 11 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-12-hours",
    title: "What Time Will It Be in 12 Hours?",
    description: "Calculate what time it will be in 12 hours from now instantly.",
    keyword: "what time will it be in 12 hours",
    category: "time",
    mode: "futureHours",
    value: 12,
    related: [
      { title: "Add 12 Hours to Now", href: "/add-12-hours-to-now" },
      { title: "What Time Was It 12 Hours Ago?", href: "/what-time-was-it-12-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 12 hours?", answer: "This page adds 12 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-18-hours",
    title: "What Time Will It Be in 18 Hours?",
    description: "Calculate what time it will be in 18 hours from now instantly.",
    keyword: "what time will it be in 18 hours",
    category: "time",
    mode: "futureHours",
    value: 18,
    related: [
      { title: "Add 18 Hours to Now", href: "/add-18-hours-to-now" },
      { title: "What Time Was It 18 Hours Ago?", href: "/what-time-was-it-18-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 18 hours?", answer: "This page adds 18 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-24-hours",
    title: "What Time Will It Be in 24 Hours?",
    description: "Calculate what time it will be in 24 hours from now instantly.",
    keyword: "what time will it be in 24 hours",
    category: "time",
    mode: "futureHours",
    value: 24,
    related: [
      { title: "Add 24 Hours to Now", href: "/add-24-hours-to-now" },
      { title: "What Time Was It 24 Hours Ago?", href: "/what-time-was-it-24-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 24 hours?", answer: "This page adds 24 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-36-hours",
    title: "What Time Will It Be in 36 Hours?",
    description: "Calculate what time it will be in 36 hours from now instantly.",
    keyword: "what time will it be in 36 hours",
    category: "time",
    mode: "futureHours",
    value: 36,
    related: [
      { title: "Add 36 Hours to Now", href: "/add-36-hours-to-now" },
      { title: "What Time Was It 36 Hours Ago?", href: "/what-time-was-it-36-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 36 hours?", answer: "This page adds 36 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-48-hours",
    title: "What Time Will It Be in 48 Hours?",
    description: "Calculate what time it will be in 48 hours from now instantly.",
    keyword: "what time will it be in 48 hours",
    category: "time",
    mode: "futureHours",
    value: 48,
    related: [
      { title: "Add 48 Hours to Now", href: "/add-48-hours-to-now" },
      { title: "What Time Was It 48 Hours Ago?", href: "/what-time-was-it-48-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 48 hours?", answer: "This page adds 48 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-60-hours",
    title: "What Time Will It Be in 60 Hours?",
    description: "Calculate what time it will be in 60 hours from now instantly.",
    keyword: "what time will it be in 60 hours",
    category: "time",
    mode: "futureHours",
    value: 60,
    related: [
      { title: "Add 60 Hours to Now", href: "/add-60-hours-to-now" },
      { title: "What Time Was It 60 Hours Ago?", href: "/what-time-was-it-60-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 60 hours?", answer: "This page adds 60 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "what-time-will-it-be-in-72-hours",
    title: "What Time Will It Be in 72 Hours?",
    description: "Calculate what time it will be in 72 hours from now instantly.",
    keyword: "what time will it be in 72 hours",
    category: "time",
    mode: "futureHours",
    value: 72,
    related: [
      { title: "Add 72 Hours to Now", href: "/add-72-hours-to-now" },
      { title: "What Time Was It 72 Hours Ago?", href: "/what-time-was-it-72-hours-ago" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" }
    ],
    faq: [
      { question: "What time will it be in 72 hours?", answer: "This page adds 72 hours to your current local time and shows the answer instantly." },
      { question: "Does this use my local time?", answer: "Yes. The calculator is based on the current time from your browser/device." },
      { question: "Can it handle tomorrow or later dates?", answer: "Yes. If the result crosses midnight or multiple days, the time still calculates correctly." },
      { question: "What is this page useful for?", answer: "It is useful for scheduling, alarms, reminders, deadlines, travel plans, and work timing." }
    ],
  },
  {
    slug: "30-minutes-to-hours",
    title: "30 Minutes to Hours",
    description: "Convert 30 minutes to hours instantly with this simple conversion page.",
    keyword: "30 minutes to hours",
    category: "utility",
    mode: "minutesToHours",
    value: 30,
    related: [
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" },
      { title: "30 Minutes From Now", href: "/30-minutes-from-now" },
      { title: "Hours to Minutes Calculator", href: "/hours-to-minutes-calculator" }
    ],
    faq: [
      { question: "How many hours is 30 minutes?", answer: "30 minutes is 0.5 hours." },
      { question: "How do you convert 30 minutes to hours?", answer: "Divide 30 by 60 to convert minutes into hours." },
      { question: "What is this conversion useful for?", answer: "It is useful for timesheets, scheduling, study blocks, workouts, and project planning." },
      { question: "Can I convert other minute values?", answer: "Yes. Use the minutes to hours calculator for any custom value." }
    ],
  },
  {
    slug: "45-minutes-to-hours",
    title: "45 Minutes to Hours",
    description: "Convert 45 minutes to hours instantly with this simple conversion page.",
    keyword: "45 minutes to hours",
    category: "utility",
    mode: "minutesToHours",
    value: 45,
    related: [
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" },
      { title: "45 Minutes From Now", href: "/45-minutes-from-now" },
      { title: "Hours to Minutes Calculator", href: "/hours-to-minutes-calculator" }
    ],
    faq: [
      { question: "How many hours is 45 minutes?", answer: "45 minutes is 0.75 hours." },
      { question: "How do you convert 45 minutes to hours?", answer: "Divide 45 by 60 to convert minutes into hours." },
      { question: "What is this conversion useful for?", answer: "It is useful for timesheets, scheduling, study blocks, workouts, and project planning." },
      { question: "Can I convert other minute values?", answer: "Yes. Use the minutes to hours calculator for any custom value." }
    ],
  },
  {
    slug: "60-minutes-to-hours",
    title: "60 Minutes to Hours",
    description: "Convert 60 minutes to hours instantly with this simple conversion page.",
    keyword: "60 minutes to hours",
    category: "utility",
    mode: "minutesToHours",
    value: 60,
    related: [
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" },
      { title: "60 Minutes From Now", href: "/60-minutes-from-now" },
      { title: "Hours to Minutes Calculator", href: "/hours-to-minutes-calculator" }
    ],
    faq: [
      { question: "How many hours is 60 minutes?", answer: "60 minutes is 1 hours." },
      { question: "How do you convert 60 minutes to hours?", answer: "Divide 60 by 60 to convert minutes into hours." },
      { question: "What is this conversion useful for?", answer: "It is useful for timesheets, scheduling, study blocks, workouts, and project planning." },
      { question: "Can I convert other minute values?", answer: "Yes. Use the minutes to hours calculator for any custom value." }
    ],
  },
  {
    slug: "75-minutes-to-hours",
    title: "75 Minutes to Hours",
    description: "Convert 75 minutes to hours instantly with this simple conversion page.",
    keyword: "75 minutes to hours",
    category: "utility",
    mode: "minutesToHours",
    value: 75,
    related: [
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" },
      { title: "75 Minutes From Now", href: "/75-minutes-from-now" },
      { title: "Hours to Minutes Calculator", href: "/hours-to-minutes-calculator" }
    ],
    faq: [
      { question: "How many hours is 75 minutes?", answer: "75 minutes is 1.25 hours." },
      { question: "How do you convert 75 minutes to hours?", answer: "Divide 75 by 60 to convert minutes into hours." },
      { question: "What is this conversion useful for?", answer: "It is useful for timesheets, scheduling, study blocks, workouts, and project planning." },
      { question: "Can I convert other minute values?", answer: "Yes. Use the minutes to hours calculator for any custom value." }
    ],
  },
  {
    slug: "150-minutes-to-hours",
    title: "150 Minutes to Hours",
    description: "Convert 150 minutes to hours instantly with this simple conversion page.",
    keyword: "150 minutes to hours",
    category: "utility",
    mode: "minutesToHours",
    value: 150,
    related: [
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" },
      { title: "150 Minutes From Now", href: "/150-minutes-from-now" },
      { title: "Hours to Minutes Calculator", href: "/hours-to-minutes-calculator" }
    ],
    faq: [
      { question: "How many hours is 150 minutes?", answer: "150 minutes is 2.5 hours." },
      { question: "How do you convert 150 minutes to hours?", answer: "Divide 150 by 60 to convert minutes into hours." },
      { question: "What is this conversion useful for?", answer: "It is useful for timesheets, scheduling, study blocks, workouts, and project planning." },
      { question: "Can I convert other minute values?", answer: "Yes. Use the minutes to hours calculator for any custom value." }
    ],
  },
  {
    slug: "180-minutes-to-hours",
    title: "180 Minutes to Hours",
    description: "Convert 180 minutes to hours instantly with this simple conversion page.",
    keyword: "180 minutes to hours",
    category: "utility",
    mode: "minutesToHours",
    value: 180,
    related: [
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" },
      { title: "180 Minutes From Now", href: "/180-minutes-from-now" },
      { title: "Hours to Minutes Calculator", href: "/hours-to-minutes-calculator" }
    ],
    faq: [
      { question: "How many hours is 180 minutes?", answer: "180 minutes is 3 hours." },
      { question: "How do you convert 180 minutes to hours?", answer: "Divide 180 by 60 to convert minutes into hours." },
      { question: "What is this conversion useful for?", answer: "It is useful for timesheets, scheduling, study blocks, workouts, and project planning." },
      { question: "Can I convert other minute values?", answer: "Yes. Use the minutes to hours calculator for any custom value." }
    ],
  },
  {
    slug: "200-minutes-to-hours",
    title: "200 Minutes to Hours",
    description: "Convert 200 minutes to hours instantly with this simple conversion page.",
    keyword: "200 minutes to hours",
    category: "utility",
    mode: "minutesToHours",
    value: 200,
    related: [
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" },
      { title: "200 Minutes From Now", href: "/200-minutes-from-now" },
      { title: "Hours to Minutes Calculator", href: "/hours-to-minutes-calculator" }
    ],
    faq: [
      { question: "How many hours is 200 minutes?", answer: "200 minutes is 3.33 hours." },
      { question: "How do you convert 200 minutes to hours?", answer: "Divide 200 by 60 to convert minutes into hours." },
      { question: "What is this conversion useful for?", answer: "It is useful for timesheets, scheduling, study blocks, workouts, and project planning." },
      { question: "Can I convert other minute values?", answer: "Yes. Use the minutes to hours calculator for any custom value." }
    ],
  },
  {
    slug: "240-minutes-to-hours",
    title: "240 Minutes to Hours",
    description: "Convert 240 minutes to hours instantly with this simple conversion page.",
    keyword: "240 minutes to hours",
    category: "utility",
    mode: "minutesToHours",
    value: 240,
    related: [
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" },
      { title: "240 Minutes From Now", href: "/240-minutes-from-now" },
      { title: "Hours to Minutes Calculator", href: "/hours-to-minutes-calculator" }
    ],
    faq: [
      { question: "How many hours is 240 minutes?", answer: "240 minutes is 4 hours." },
      { question: "How do you convert 240 minutes to hours?", answer: "Divide 240 by 60 to convert minutes into hours." },
      { question: "What is this conversion useful for?", answer: "It is useful for timesheets, scheduling, study blocks, workouts, and project planning." },
      { question: "Can I convert other minute values?", answer: "Yes. Use the minutes to hours calculator for any custom value." }
    ],
  },
  {
    slug: "300-minutes-to-hours",
    title: "300 Minutes to Hours",
    description: "Convert 300 minutes to hours instantly with this simple conversion page.",
    keyword: "300 minutes to hours",
    category: "utility",
    mode: "minutesToHours",
    value: 300,
    related: [
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" },
      { title: "300 Minutes From Now", href: "/300-minutes-from-now" },
      { title: "Hours to Minutes Calculator", href: "/hours-to-minutes-calculator" }
    ],
    faq: [
      { question: "How many hours is 300 minutes?", answer: "300 minutes is 5 hours." },
      { question: "How do you convert 300 minutes to hours?", answer: "Divide 300 by 60 to convert minutes into hours." },
      { question: "What is this conversion useful for?", answer: "It is useful for timesheets, scheduling, study blocks, workouts, and project planning." },
      { question: "Can I convert other minute values?", answer: "Yes. Use the minutes to hours calculator for any custom value." }
    ],
  },
  {
    slug: "360-minutes-to-hours",
    title: "360 Minutes to Hours",
    description: "Convert 360 minutes to hours instantly with this simple conversion page.",
    keyword: "360 minutes to hours",
    category: "utility",
    mode: "minutesToHours",
    value: 360,
    related: [
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" },
      { title: "360 Minutes From Now", href: "/360-minutes-from-now" },
      { title: "Hours to Minutes Calculator", href: "/hours-to-minutes-calculator" }
    ],
    faq: [
      { question: "How many hours is 360 minutes?", answer: "360 minutes is 6 hours." },
      { question: "How do you convert 360 minutes to hours?", answer: "Divide 360 by 60 to convert minutes into hours." },
      { question: "What is this conversion useful for?", answer: "It is useful for timesheets, scheduling, study blocks, workouts, and project planning." },
      { question: "Can I convert other minute values?", answer: "Yes. Use the minutes to hours calculator for any custom value." }
    ],
  },
  {
    slug: "8am-to-4pm-hours",
    title: "8AM to 4PM Hours",
    description: "Calculate how many hours are between 8AM and 4PM, including common break examples.",
    keyword: "8am to 4pm hours",
    category: "utility",
    mode: "workHours",
    related: [
      { title: "Work Hours Calculator", href: "/work-hours-calculator" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "How many hours is 8AM to 4PM?", answer: "8AM to 4PM is 8 hours total." },
      { question: "How many paid hours with a 30-minute break?", answer: "With a 30-minute unpaid break, the paid time is 7.5 hours." },
      { question: "How many paid hours with a 1-hour break?", answer: "With a 1-hour unpaid break, the paid time is 7 hours." },
      { question: "Can I calculate other shifts?", answer: "Yes. Use the work hours calculator for custom start times, end times, and breaks." }
    ],
  },
  {
    slug: "7am-to-3pm-hours",
    title: "7AM to 3PM Hours",
    description: "Calculate how many hours are between 7AM and 3PM, including common break examples.",
    keyword: "7am to 3pm hours",
    category: "utility",
    mode: "workHours",
    related: [
      { title: "Work Hours Calculator", href: "/work-hours-calculator" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "How many hours is 7AM to 3PM?", answer: "7AM to 3PM is 8 hours total." },
      { question: "How many paid hours with a 30-minute break?", answer: "With a 30-minute unpaid break, the paid time is 7.5 hours." },
      { question: "How many paid hours with a 1-hour break?", answer: "With a 1-hour unpaid break, the paid time is 7 hours." },
      { question: "Can I calculate other shifts?", answer: "Yes. Use the work hours calculator for custom start times, end times, and breaks." }
    ],
  },
  {
    slug: "10am-to-6pm-hours",
    title: "10AM to 6PM Hours",
    description: "Calculate how many hours are between 10AM and 6PM, including common break examples.",
    keyword: "10am to 6pm hours",
    category: "utility",
    mode: "workHours",
    related: [
      { title: "Work Hours Calculator", href: "/work-hours-calculator" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "How many hours is 10AM to 6PM?", answer: "10AM to 6PM is 8 hours total." },
      { question: "How many paid hours with a 30-minute break?", answer: "With a 30-minute unpaid break, the paid time is 7.5 hours." },
      { question: "How many paid hours with a 1-hour break?", answer: "With a 1-hour unpaid break, the paid time is 7 hours." },
      { question: "Can I calculate other shifts?", answer: "Yes. Use the work hours calculator for custom start times, end times, and breaks." }
    ],
  },
  {
    slug: "6am-to-2pm-hours",
    title: "6AM to 2PM Hours",
    description: "Calculate how many hours are between 6AM and 2PM, including common break examples.",
    keyword: "6am to 2pm hours",
    category: "utility",
    mode: "workHours",
    related: [
      { title: "Work Hours Calculator", href: "/work-hours-calculator" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "How many hours is 6AM to 2PM?", answer: "6AM to 2PM is 8 hours total." },
      { question: "How many paid hours with a 30-minute break?", answer: "With a 30-minute unpaid break, the paid time is 7.5 hours." },
      { question: "How many paid hours with a 1-hour break?", answer: "With a 1-hour unpaid break, the paid time is 7 hours." },
      { question: "Can I calculate other shifts?", answer: "Yes. Use the work hours calculator for custom start times, end times, and breaks." }
    ],
  },
  {
    slug: "12pm-to-8pm-hours",
    title: "12PM to 8PM Hours",
    description: "Calculate how many hours are between 12PM and 8PM, including common break examples.",
    keyword: "12pm to 8pm hours",
    category: "utility",
    mode: "workHours",
    related: [
      { title: "Work Hours Calculator", href: "/work-hours-calculator" },
      { title: "Time Duration Calculator", href: "/time-duration-calculator" },
      { title: "Minutes to Hours Calculator", href: "/minutes-to-hours-calculator" }
    ],
    faq: [
      { question: "How many hours is 12PM to 8PM?", answer: "12PM to 8PM is 8 hours total." },
      { question: "How many paid hours with a 30-minute break?", answer: "With a 30-minute unpaid break, the paid time is 7.5 hours." },
      { question: "How many paid hours with a 1-hour break?", answer: "With a 1-hour unpaid break, the paid time is 7 hours." },
      { question: "Can I calculate other shifts?", answer: "Yes. Use the work hours calculator for custom start times, end times, and breaks." }
    ],
  }
];

export const TOOL_PAGES: ToolPageConfig[] = [
  ...NEXT_FIFTY_SEO_PAGES,
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

