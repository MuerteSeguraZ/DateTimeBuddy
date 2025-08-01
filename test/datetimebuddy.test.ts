import { describe, it, expect } from "vitest";
import { DateTimeBuddy } from "../src/index";

describe("DateTimeBuddy", () => {
  it("creates instance with now", () => {
    const dt = DateTimeBuddy.now();
    expect(dt).toBeInstanceOf(DateTimeBuddy);
  });

  it("creates instance from string and number", () => {
    const fromStr = new DateTimeBuddy("2025-07-26T00:00:00Z");
    const fromNum = new DateTimeBuddy(Date.parse("2025-07-26T00:00:00Z"));
    expect(fromStr.toISOString()).toBe("2025-07-26T00:00:00.000Z");
    expect(fromNum.toISOString()).toBe("2025-07-26T00:00:00.000Z");
  });

  it("adds and subtracts days", () => {
    const dt = new DateTimeBuddy("2025-07-26T00:00:00Z").addDays(5).subtractDays(3);
    expect(dt.format("YYYY-MM-DD")).toBe("2025-07-28");
  });

  it("adds and subtracts hours and minutes", () => {
    const dt = new DateTimeBuddy("2025-07-26T12:00:00Z")
      .addHours(5)
      .subtractHours(2)
      .addMinutes(30)
      .subtractMinutes(15);
    expect(dt.format("HH:mm")).toBe("15:15");
  });

  it("accesses individual date parts", () => {
    const dt = new DateTimeBuddy("2025-07-26T12:34:56Z");
    expect(dt.year()).toBe(2025);
    expect(dt.month()).toBe(7);
    expect(dt.day()).toBe(26);
    expect(dt.hour()).toBe(12);
    expect(dt.minute()).toBe(34);
    expect(dt.second()).toBe(56);
  });

  it("formats date correctly", () => {
    const dt = new DateTimeBuddy("2025-07-26T15:04:05Z");
    expect(dt.format("YYYY-MM-DD HH:mm:ss")).toBe("2025-07-26 15:04:05");
  });

  it("compares dates", () => {
    const dt1 = new DateTimeBuddy("2025-07-26T12:00:00Z");
    const dt2 = new DateTimeBuddy("2025-07-27T12:00:00Z");
    expect(dt1.isBefore(dt2)).toBe(true);
    expect(dt2.isAfter(dt1)).toBe(true);
    expect(dt1.isSame(dt1)).toBe(true);
  });

  it("calculates days between", () => {
    const dt1 = new DateTimeBuddy("2025-07-01T00:00:00Z");
    const dt2 = new DateTimeBuddy("2025-07-26T00:00:00Z");
    expect(dt1.daysBetween(dt2)).toBe(25);
  });

  it("gets start and end of day", () => {
    const dt = new DateTimeBuddy("2025-07-26T15:30:00Z");
    expect(dt.clone().startOfDay().format("HH:mm:ss")).toBe("00:00:00");
    expect(dt.clone().endOfDay().format("HH:mm:ss")).toBe("23:59:59");
  });

  it("gets start and end of month", () => {
    const dt = new DateTimeBuddy("2025-07-15T12:00:00Z");
    expect(dt.clone().startOfMonth().format("YYYY-MM-DD")).toBe("2025-07-01");
    expect(dt.clone().endOfMonth().format("YYYY-MM-DD")).toBe("2025-07-31");
  });

  it("gets start and end of year", () => {
    const dt = new DateTimeBuddy("2025-07-26T00:00:00Z");
    expect(dt.clone().startOfYear().format("YYYY-MM-DD")).toBe("2025-01-01");
    expect(dt.clone().endOfYear().format("YYYY-MM-DD")).toBe("2025-12-31");
  });

  it("sets date components", () => {
    const dt = new DateTimeBuddy("2025-01-01T00:00:00Z");
    dt.setDateComponents({ month: 12, day: 25, hour: 6 });
    expect(dt.format("YYYY-MM-DD HH")).toBe("2025-12-25 06");
  });

  it("clones the instance", () => {
    const original = new DateTimeBuddy("2025-07-26T00:00:00Z");
    const copy = original.clone().addDays(1);
    expect(original.format("YYYY-MM-DD")).toBe("2025-07-26");
    expect(copy.format("YYYY-MM-DD")).toBe("2025-07-27");
  });

  it("converts to Date and ISO string", () => {
    const dt = new DateTimeBuddy("2025-07-26T00:00:00Z");
    expect(dt.toDate()).toBeInstanceOf(Date);
    expect(dt.toISOString()).toBe("2025-07-26T00:00:00.000Z");
  });

  it("handles unix timestamp", () => {
    const timestamp = Date.parse("2025-07-25T00:00:00Z") / 1000;
    const dt = DateTimeBuddy.fromUnixTimestamp(timestamp);
    expect(dt.toUnixTimestamp()).toBe(timestamp);
    expect(dt.format("YYYY-MM-DD")).toBe("2025-07-25");
  });

  it("applies timezone offset correctly", () => {
    const dt = new DateTimeBuddy("2025-07-26T00:00:00Z");
    dt.applyOffset(2);
    expect(dt.format("HH:mm:ss")).toBe("02:00:00");

    dt.applyOffset(-3);
    expect(dt.format("HH:mm:ss")).toBe("23:00:00");
  });

  // 🆕 Tests for new methods

  it("gets weekday and ISO weekday", () => {
    const dt = new DateTimeBuddy("2025-07-26T00:00:00Z"); // Saturday
    expect(dt.getWeekday()).toBe("Saturday");
    expect(dt.getISOWeekday()).toBe(6);
    expect(dt.getDayOfWeek()).toBe(6);
  });

  it("gets week number", () => {
    const dt = new DateTimeBuddy("2025-01-02T00:00:00Z");
    expect(dt.getWeekNumber()).toBe(1);
  });

  it("checks leap year", () => {
    expect(new DateTimeBuddy("2024-01-01T00:00:00Z").isLeapYear()).toBe(true);
    expect(new DateTimeBuddy("2025-01-01T00:00:00Z").isLeapYear()).toBe(false);
  });

  it("returns days in month", () => {
    expect(new DateTimeBuddy("2025-02-01T00:00:00Z").daysInMonth()).toBe(28);
    expect(new DateTimeBuddy("2024-02-01T00:00:00Z").daysInMonth()).toBe(29);
  });

  it("checks if date is weekend", () => {
    expect(new DateTimeBuddy("2025-07-26T00:00:00Z").isWeekend()).toBe(true); // Saturday
    expect(new DateTimeBuddy("2025-07-28T00:00:00Z").isWeekend()).toBe(false); // Monday
  });

  it("compares by date only", () => {
    const dt1 = new DateTimeBuddy("2025-07-26T12:00:00Z");
    const dt2 = new DateTimeBuddy("2025-07-26T23:59:59Z");
    expect(dt1.equalsDateOnly(dt2)).toBe(true);
  });

  it("returns relative time", () => {
    const future = DateTimeBuddy.now().clone().addMinutes(1);
    const past = DateTimeBuddy.now().clone().subtractMinutes(1);
    expect(future.fromNow().includes("in")).toBe(true);
    expect(past.timeAgo().includes("ago")).toBe(true);
  });

  it("formats friendly", () => {
    const dt = new DateTimeBuddy("2025-07-26T15:04:05Z");
    const formatted = dt.formatFriendly();
    expect(typeof formatted).toBe("string");
    expect(formatted).toContain("Saturday");
    expect(formatted).toContain("2025");
  });

    it("returns UTC string", () => {
    const dt = new DateTimeBuddy("2025-07-26T00:00:00Z");
    expect(dt.toUTCString()).toBe("Sat, 26 Jul 2025 00:00:00 GMT");
  });

  it("returns JSON and ISO string", () => {
    const dt = new DateTimeBuddy("2025-07-26T00:00:00Z");
    expect(dt.toJSON()).toBe("2025-07-26T00:00:00.000Z");
  });

  it("returns locale string representations", () => {
    const dt = new DateTimeBuddy("2025-07-26T15:04:05Z");

    const localeStr = dt.toLocaleString("en-US");
    expect(typeof localeStr).toBe("string");
    expect(localeStr).toContain("2025");

    const localeDate = dt.toLocaleDateString("en-US");
    expect(typeof localeDate).toBe("string");
  });

  it("compares dates using compare()", () => {
    const dt1 = new DateTimeBuddy("2025-07-26T00:00:00Z");
    const dt2 = new DateTimeBuddy("2025-07-27T00:00:00Z");
    const dt3 = new DateTimeBuddy("2025-07-26T00:00:00Z");

    expect(dt1.compare(dt2)).toBe(-1);
    expect(dt2.compare(dt1)).toBe(1);
    expect(dt1.compare(dt3)).toBe(0);
  });

  it("calculates diffIn with various units using Math.floor", () => {
  const dt1 = new DateTimeBuddy("2025-07-26T00:00:00Z");
  const dt2 = new DateTimeBuddy("2025-07-27T12:34:56Z"); // 1d 12h 34m 56s later

  expect(dt2.diffIn(dt1, "seconds")).toBe(131696);  // 1d * 86400 + 12h * 3600 + 34m * 60 + 56
  expect(dt2.diffIn(dt1, "minutes")).toBe(2194);     // 131696 / 60
  expect(dt2.diffIn(dt1, "hours")).toBe(36);         // 2194 / 60
  expect(dt2.diffIn(dt1, "days")).toBe(1);           // 36 / 24
  });

    it("gets current week start and end", () => {
    const dt = new DateTimeBuddy("2025-07-26T12:00:00Z"); // Saturday
    const week = dt.currentWeek();
    expect(week.start.format("YYYY-MM-DD HH:mm:ss")).toBe("2025-07-21 00:00:00"); // Monday
    expect(week.end.format("YYYY-MM-DD HH:mm:ss")).toBe("2025-07-27 23:59:59");   // Sunday
  });

  it("gets next week start and end", () => {
    const dt = new DateTimeBuddy("2025-07-26T12:00:00Z");
    const week = dt.nextWeek();
    expect(week.start.format("YYYY-MM-DD")).toBe("2025-07-28");
    expect(week.end.format("YYYY-MM-DD")).toBe("2025-08-03");
  });

  it("gets previous week start and end", () => {
    const dt = new DateTimeBuddy("2025-07-26T12:00:00Z");
    const week = dt.previousWeek();
    expect(week.start.format("YYYY-MM-DD")).toBe("2025-07-14");
    expect(week.end.format("YYYY-MM-DD")).toBe("2025-07-20");
  });

  it("adds weeks", () => {
    const dt = new DateTimeBuddy("2025-07-26T00:00:00Z").addWeeks(2);
    expect(dt.format("YYYY-MM-DD")).toBe("2025-08-09");
  });

  it("subtracts weeks", () => {
    const dt = new DateTimeBuddy("2025-07-26T00:00:00Z").subtractWeeks(1);
    expect(dt.format("YYYY-MM-DD")).toBe("2025-07-19");
  });

    it("handles week boundary logic", () => {
    const sunday = new DateTimeBuddy("2025-07-27T23:59:59Z");
    const monday = new DateTimeBuddy("2025-07-28T00:00:00Z");

    expect(sunday.currentWeek().end.format("YYYY-MM-DD")).toBe("2025-07-27");
    expect(monday.currentWeek().start.format("YYYY-MM-DD")).toBe("2025-07-28");
  });
});
