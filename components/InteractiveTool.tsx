"use client";

import { useMemo, useState } from "react";
import type { ToolPageConfig } from "@/data/toolPages";
import {
  addDays, addHours, addMinutes, calculateDaysBetween, calculateDaysUntil, calculateWorkHours,
  formatDate, formatTime, getSleepOptions, hoursToMinutes, minutesToHours, secondsToMinutes,
  subtractDays, subtractHours, subtractMinutes
} from "@/lib/calculations";

function todayString() {
  return new Date().toISOString().slice(0, 10);
}
function nowTimeString() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}

export default function InteractiveTool({ config }: { config: ToolPageConfig }) {
  const [startDate, setStartDate] = useState(todayString());
  const [endDate, setEndDate] = useState(todayString());
  const [startTime, setStartTime] = useState(nowTimeString());
  const [endTime, setEndTime] = useState("17:00");
  const [breakMinutes, setBreakMinutes] = useState(30);
  const [customHours, setCustomHours] = useState(8);
  const [customMinutes, setCustomMinutes] = useState(30);
  const [customSeconds, setCustomSeconds] = useState(1800);
  const [wakeTime, setWakeTime] = useState("07:00");

  const now = new Date();
  const value = typeof config.value === "number" ? config.value : undefined;
  const targetDate = typeof config.value === "string" ? config.value : undefined;

  const primary = useMemo(() => {
    switch (config.mode) {
      case "addHours":
      case "futureHours":
        return { a: "Current Time", b: "Result", av: formatTime(now), bv: formatTime(addHours(now, value ?? 0)) };
      case "addMinutes":
      case "futureMinutes":
        return { a: "Current Time", b: "Result", av: formatTime(now), bv: formatTime(addMinutes(now, value ?? 0)) };
      case "subtractHours":
      case "pastHours":
        return { a: "Current Time", b: "Result", av: formatTime(now), bv: formatTime(subtractHours(now, value ?? 0)) };
      case "subtractMinutes":
      case "pastMinutes":
        return { a: "Current Time", b: "Result", av: formatTime(now), bv: formatTime(subtractMinutes(now, value ?? 0)) };
      case "daysUntil": {
        const days = calculateDaysUntil(targetDate ?? todayString());
        return { a: "Target Date", b: "Days Remaining", av: targetDate ?? todayString(), bv: days < 0 ? `${Math.abs(days)} days ago` : `${days} days` };
      }
      case "daysBetween": {
        const days = calculateDaysBetween(startDate, endDate);
        return { a: "Start Date", b: "Days Between", av: startDate, bv: `${days} days` };
      }
      case "addDays": {
        const result = addDays(startDate, value ?? 0);
        return { a: "Start Date", b: "Resulting Date", av: startDate, bv: formatDate(result) };
      }
      case "subtractDays": {
        const result = subtractDays(startDate, value ?? 0);
        return { a: "Start Date", b: "Resulting Date", av: startDate, bv: formatDate(result) };
      }
      case "hoursToMinutes":
        return { a: "Hours", b: "Minutes", av: `${customHours}`, bv: `${hoursToMinutes(customHours)} minutes` };
      case "minutesToHours":
        return { a: "Minutes", b: "Hours", av: `${customMinutes}`, bv: `${minutesToHours(customMinutes).toFixed(2)} hours` };
      case "secondsToMinutes":
        return { a: "Seconds", b: "Minutes", av: `${customSeconds}`, bv: `${secondsToMinutes(customSeconds).toFixed(2)} minutes` };
      case "timeDuration": {
        const result = calculateWorkHours(startTime, endTime, 0);
        return { a: "Start / End", b: "Duration", av: `${startTime} → ${endTime}`, bv: `${result.hours.toFixed(2)} hours` };
      }
      case "workHours": {
        const result = calculateWorkHours(startTime, endTime, breakMinutes);
        return { a: "Shift Window", b: "Paid Hours", av: `${startTime} → ${endTime}`, bv: `${result.hours.toFixed(2)} hours` };
      }
      case "sleep": {
        const options = getSleepOptions(wakeTime);
        return { a: "Wake Time", b: "Best Bedtime", av: wakeTime, bv: formatTime(options[0]) };
      }
      default:
        return { a: "Result", b: "Result", av: "-", bv: "-" };
    }
  }, [config.mode, value, targetDate, startDate, endDate, startTime, endTime, breakMinutes, customHours, customMinutes, customSeconds, wakeTime]);

  const sleepOptions = config.mode === "sleep" ? getSleepOptions(wakeTime) : [];

  return (
    <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <Card label={primary.a} value={primary.av} />
        <Card label={primary.b} value={primary.bv} />
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Interactive tool</h2>

        {config.mode === "daysBetween" && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-700">Start date
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <label className="text-sm text-slate-700">End date
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
          </div>
        )}

        {(config.mode === "addDays" || config.mode === "subtractDays") && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-700">Starting date
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
          </div>
        )}

        {config.mode === "hoursToMinutes" && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-700">Hours
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" type="number" value={customHours} onChange={(e) => setCustomHours(Number(e.target.value))} />
            </label>
          </div>
        )}

        {config.mode === "minutesToHours" && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-700">Minutes
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" type="number" value={customMinutes} onChange={(e) => setCustomMinutes(Number(e.target.value))} />
            </label>
          </div>
        )}

        {config.mode === "secondsToMinutes" && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-700">Seconds
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" type="number" value={customSeconds} onChange={(e) => setCustomSeconds(Number(e.target.value))} />
            </label>
          </div>
        )}

        {(config.mode === "timeDuration" || config.mode === "workHours") && (
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="text-sm text-slate-700">Start time
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </label>
            <label className="text-sm text-slate-700">End time
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </label>
            {config.mode === "workHours" && (
              <label className="text-sm text-slate-700">Break minutes
                <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" type="number" value={breakMinutes} onChange={(e) => setBreakMinutes(Number(e.target.value))} />
              </label>
            )}
          </div>
        )}

        {config.mode === "sleep" && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-700">Wake time
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} />
            </label>
            <div className="text-sm text-slate-700">
              <p className="font-medium">Suggested bedtimes</p>
              <ul className="mt-2 space-y-1">
                {sleepOptions.map((option, index) => <li key={index}>{formatTime(option)}</li>)}
              </ul>
            </div>
          </div>
        )}

        <p className="mt-4 text-slate-700">
          This page is built to answer the question quickly while still giving visitors an interactive way to test their own values.
        </p>
      </div>
    </div>
  );
}
