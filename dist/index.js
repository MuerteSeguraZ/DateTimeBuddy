"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DateTimeBuddy: () => DateTimeBuddy
});
module.exports = __toCommonJS(index_exports);
var DateTimeBuddy = class _DateTimeBuddy {
  constructor(date, timeZone = "UTC") {
    if (date instanceof Date) {
      this.date = new Date(date.getTime());
    } else if (typeof date === "string" || typeof date === "number") {
      this.date = new Date(date);
    } else {
      this.date = /* @__PURE__ */ new Date();
    }
    this.timeZone = timeZone;
  }
  static now(timeZone = "UTC") {
    return new _DateTimeBuddy(/* @__PURE__ */ new Date(), timeZone);
  }
  static parse(dateStr, timeZone = "UTC") {
    return new _DateTimeBuddy(new Date(dateStr), timeZone);
  }
  static fromUnixTimestamp(seconds, timeZone = "UTC") {
    return new _DateTimeBuddy(seconds * 1e3, timeZone);
  }
  setTimeZone(tz) {
    this.timeZone = tz;
    return this;
  }
  getTimeZone() {
    return this.timeZone;
  }
  addDays(days) {
    this.date.setUTCDate(this.date.getUTCDate() + days);
    return this;
  }
  subtractDays(days) {
    return this.addDays(-days);
  }
  addHours(hours) {
    this.date.setUTCHours(this.date.getUTCHours() + hours);
    return this;
  }
  subtractHours(hours) {
    return this.addHours(-hours);
  }
  addMinutes(minutes) {
    this.date.setUTCMinutes(this.date.getUTCMinutes() + minutes);
    return this;
  }
  subtractMinutes(minutes) {
    return this.addMinutes(-minutes);
  }
  getParts() {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: this.timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).formatToParts(this.date);
  }
  getPart(type) {
    const part = this.getParts().find((p) => p.type === type);
    if (!part) return 0;
    const value = parseInt(part.value, 10);
    if (type === "hour" && value === 24) return 0;
    return value;
  }
  year() {
    return this.getPart("year");
  }
  month() {
    return this.getPart("month");
  }
  day() {
    return this.getPart("day");
  }
  hour() {
    return this.getPart("hour");
  }
  minute() {
    return this.getPart("minute");
  }
  second() {
    return this.getPart("second");
  }
  isBefore(other) {
    const otherTime = other instanceof _DateTimeBuddy ? other.date.getTime() : other.getTime();
    return this.date.getTime() < otherTime;
  }
  isAfter(other) {
    const otherTime = other instanceof _DateTimeBuddy ? other.date.getTime() : other.getTime();
    return this.date.getTime() > otherTime;
  }
  isSame(other) {
    const otherTime = other instanceof _DateTimeBuddy ? other.date.getTime() : other.getTime();
    return this.date.getTime() === otherTime;
  }
  daysBetween(other) {
    const otherDate = other instanceof _DateTimeBuddy ? other.date : other;
    const diff = Math.abs(this.date.getTime() - otherDate.getTime());
    return Math.floor(diff / (1e3 * 60 * 60 * 24));
  }
  startOfDay() {
    const dt = new Date(this.date.valueOf());
    dt.setUTCHours(0, 0, 0, 0);
    return new _DateTimeBuddy(dt, this.timeZone);
  }
  endOfDay() {
    const dt = new Date(this.date.valueOf());
    dt.setUTCHours(23, 59, 59, 999);
    return new _DateTimeBuddy(dt, this.timeZone);
  }
  startOfMonth() {
    const y = this.year();
    const m = this.month();
    this.date = new Date(Date.UTC(y, m - 1, 1, 0, 0, 0, 0));
    return this;
  }
  endOfMonth() {
    const y = this.year();
    const m = this.month();
    this.date = new Date(Date.UTC(y, m, 0, 23, 59, 59, 999));
    return this;
  }
  startOfYear() {
    const y = this.year();
    this.date = new Date(Date.UTC(y, 0, 1, 0, 0, 0, 0));
    return this;
  }
  endOfYear() {
    const y = this.year();
    this.date = new Date(Date.UTC(y, 11, 31, 23, 59, 59, 999));
    return this;
  }
  setDateComponents({
    year,
    month,
    day,
    hour,
    minute,
    second
  }) {
    const y = year ?? this.year();
    const m = (month ?? this.month()) - 1;
    const d = day ?? this.day();
    const newDate = new Date(Date.UTC(y, m, d, 0, 0, 0, 0));
    newDate.setUTCHours(hour ?? 0);
    newDate.setUTCMinutes(minute ?? 0);
    newDate.setUTCSeconds(second ?? 0);
    newDate.setUTCMilliseconds(0);
    this.date = newDate;
    return this;
  }
  format(formatStr) {
    const pad = (n, z = 2) => n.toString().padStart(z, "0");
    const replacements = {
      YYYY: this.year().toString(),
      MM: pad(this.month()),
      DD: pad(this.day()),
      HH: pad(this.hour()),
      mm: pad(this.minute()),
      ss: pad(this.second())
    };
    return formatStr.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => replacements[match] || match);
  }
  toDate() {
    return new Date(this.date.getTime());
  }
  toISOString() {
    return this.date.toISOString();
  }
  toUnixTimestamp() {
    return Math.floor(this.date.getTime() / 1e3);
  }
  clone() {
    return new _DateTimeBuddy(this.date, this.timeZone);
  }
  applyOffset(offsetHours) {
    const ms = offsetHours * 60 * 60 * 1e3;
    this.date = new Date(this.date.getTime() + ms);
    return this;
  }
  getWeekday() {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: this.timeZone,
      weekday: "long"
    }).format(this.date);
  }
  getDayOfWeek() {
    const dtf = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      timeZone: this.timeZone
    });
    const part = dtf.formatToParts(this.date).find((p) => p.type === "weekday");
    return this.date.getUTCDay();
  }
  getISOWeekday() {
    const day = this.date.getUTCDay();
    return day === 0 ? 7 : day;
  }
  getWeekNumber() {
    const tempDate = new Date(this.date.getTime());
    tempDate.setUTCHours(0, 0, 0, 0);
    tempDate.setUTCDate(tempDate.getUTCDate() + 4 - (tempDate.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((tempDate.getTime() - yearStart.getTime()) / 864e5 + 1) / 7);
    return weekNo;
  }
  isLeapYear() {
    const y = this.year();
    return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0;
  }
  daysInMonth() {
    const y = this.year();
    const m = this.month();
    return new Date(Date.UTC(y, m, 0)).getUTCDate();
  }
  isWeekend() {
    const day = this.getDayOfWeek();
    return day === 0 || day === 6;
  }
  equalsDateOnly(other) {
    return this.year() === other.year() && this.month() === other.month() && this.day() === other.day();
  }
  fromNow() {
    const now = new _DateTimeBuddy(/* @__PURE__ */ new Date(), this.timeZone);
    const seconds = Math.floor((this.date.getTime() - now.date.getTime()) / 1e3);
    if (Math.abs(seconds) < 10) return "just now";
    const future = seconds > 0;
    const abs = Math.abs(seconds);
    const units = [
      ["year", 31536e3],
      ["month", 2592e3],
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
      ["second", 1]
    ];
    for (const [unit, value] of units) {
      const amount = Math.floor(abs / value);
      if (amount >= 1) {
        return future ? `in ${amount} ${unit}${amount > 1 ? "s" : ""}` : `${amount} ${unit}${amount > 1 ? "s" : ""} ago`;
      }
    }
    return future ? "in a moment" : "just now";
  }
  timeAgo() {
    const now = new _DateTimeBuddy(/* @__PURE__ */ new Date(), this.timeZone);
    const seconds = Math.floor((now.date.getTime() - this.date.getTime()) / 1e3);
    if (Math.abs(seconds) < 10) return "just now";
    const units = [
      ["year", 31536e3],
      ["month", 2592e3],
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
      ["second", 1]
    ];
    for (const [unit, value] of units) {
      const amount = Math.floor(seconds / value);
      if (amount >= 1) {
        return `${amount} ${unit}${amount > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }
  formatFriendly(locale = "en-US", options) {
    return new Intl.DateTimeFormat(locale, {
      timeZone: this.timeZone,
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      ...options
    }).format(this.date);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DateTimeBuddy
});
