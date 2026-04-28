import type { ToolPageConfig } from "@/data/toolPages";
import { getUnitLabel } from "@/lib/calculations";

export function getBodyCopy(config: ToolPageConfig) {
  const value = typeof config.value === "number" ? config.value : undefined;
  const unit = value !== undefined ? getUnitLabel(config.mode, value) : "";
  const keyword = config.keyword;

  switch (config.mode) {
    case "daysUntil":
      return {
        intro: `This countdown page helps visitors see exactly how many days remain until ${keyword.replace("how many days until ", "")}. It is useful for event planning, holiday tracking, travel, school milestones, and personal deadlines.`,
        examples: ["Track major holidays before they arrive", "Check how long you have before a trip or deadline", "Use the page as a quick reminder during planning"],
        uses: ["Holiday planning", "Travel countdowns", "School and work deadlines", "Birthdays and anniversaries"],
      };
    case "daysBetween":
      return {
        intro: "This tool calculates the number of days between two dates instantly. It is useful for contracts, countdowns, project planning, and scheduling.",
        examples: ["January 1 to January 31 = 30 days", "June 1 to July 1 = 30 days", "Custom date ranges for events and projects"],
        uses: ["Project timelines", "Travel planning", "Contracts and billing cycles", "Personal countdowns"],
      };
    case "workHours":
      return {
        intro: "This calculator helps visitors work out total shift length after breaks. It is practical for hourly workers, managers, freelancers, and payroll prep.",
        examples: ["8:00 AM to 5:00 PM with a 60-minute break", "7:30 AM to 4:00 PM with a 30-minute break", "Overnight shift calculations"],
        uses: ["Timesheets", "Payroll checks", "Freelance time logging", "Shift planning"],
      };
    case "sleep":
      return {
        intro: "This sleep calculator suggests bedtime options based on sleep cycles. It is designed for people who want more practical sleep planning than a simple alarm time.",
        examples: ["Wake at 6:30 AM", "Wake at 7:00 AM", "Wake at 8:15 AM"],
        uses: ["Daily sleep planning", "Early wake-up prep", "School and work schedules", "Better bedtime routines"],
      };
    default:
      return {
        intro: `This page answers the query "${keyword}" with a live tool and supporting examples. Instead of manually counting through hours or minutes, visitors can get the answer instantly and use the page for planning, reminders, shifts, travel timing, and scheduling.`,
        examples: ["9:00 AM → 5:00 PM", "1:30 PM → 9:30 PM", "10:00 PM → 6:00 AM the next day"],
        uses: ["Scheduling meetings", "Shift planning", "Travel timing", "Reminders and alarms"],
        unit,
      };
  }
}
