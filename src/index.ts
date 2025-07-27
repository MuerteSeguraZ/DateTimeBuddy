export class DateTimeBuddy {
  private date: Date;
  private timeZone: string;

  constructor(date?: Date | string | number, timeZone: string = 'UTC') {
    if (date instanceof Date) {
      this.date = new Date(date.getTime());
    } else if (typeof date === "string" || typeof date === "number") {
      this.date = new Date(date);
    } else {
      this.date = new Date();
    }
    this.timeZone = timeZone;
  }

  static now(timeZone = 'UTC'): DateTimeBuddy {
    return new DateTimeBuddy(new Date(), timeZone);
  }

  static parse(dateStr: string, timeZone = 'UTC'): DateTimeBuddy {
    return new DateTimeBuddy(new Date(dateStr), timeZone);
  }

  static fromUnixTimestamp(seconds: number, timeZone = 'UTC'): DateTimeBuddy {
    return new DateTimeBuddy(seconds * 1000, timeZone);
  }

  setTimeZone(tz: string): this {
    this.timeZone = tz;
    return this;
  }

  getTimeZone(): string {
    return this.timeZone;
  }

  addDays(days: number): this {
    this.date.setUTCDate(this.date.getUTCDate() + days);
    return this;
  }

  subtractDays(days: number): this {
    return this.addDays(-days);
  }

  addHours(hours: number): this {
    this.date.setUTCHours(this.date.getUTCHours() + hours);
    return this;
  }

  subtractHours(hours: number): this {
    return this.addHours(-hours);
  }

  addMinutes(minutes: number): this {
    this.date.setUTCMinutes(this.date.getUTCMinutes() + minutes);
    return this;
  }

  subtractMinutes(minutes: number): this {
    return this.addMinutes(-minutes);
  }

  private getParts(): Intl.DateTimeFormatPart[] {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: this.timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(this.date);
  }

  private getPart(type: string): number {
  const part = this.getParts().find(p => p.type === type);
  if (!part) return 0;
  const value = parseInt(part.value, 10);
  if (type === 'hour' && value === 24) return 0;
  return value;
}

  year(): number {
    return this.getPart('year');
  }

  month(): number {
    return this.getPart('month');
  }

  day(): number {
    return this.getPart('day');
  }

  hour(): number {
    return this.getPart('hour');
  }

  minute(): number {
    return this.getPart('minute');
  }

  second(): number {
    return this.getPart('second');
  }

  isBefore(other: Date | DateTimeBuddy): boolean {
    const otherTime = other instanceof DateTimeBuddy ? other.date.getTime() : other.getTime();
    return this.date.getTime() < otherTime;
  }

  isAfter(other: Date | DateTimeBuddy): boolean {
    const otherTime = other instanceof DateTimeBuddy ? other.date.getTime() : other.getTime();
    return this.date.getTime() > otherTime;
  }

  isSame(other: Date | DateTimeBuddy): boolean {
    const otherTime = other instanceof DateTimeBuddy ? other.date.getTime() : other.getTime();
    return this.date.getTime() === otherTime;
  }

  daysBetween(other: Date | DateTimeBuddy): number {
    const otherDate = other instanceof DateTimeBuddy ? other.date : other;
    const diff = Math.abs(this.date.getTime() - otherDate.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  startOfDay() {
  const dt = new Date(this.date.valueOf());
  dt.setUTCHours(0, 0, 0, 0);
  return new DateTimeBuddy(dt, this.timeZone);
}

  endOfDay() {
  const dt = new Date(this.date.valueOf());
  dt.setUTCHours(23, 59, 59, 999);
  return new DateTimeBuddy(dt, this.timeZone);
}


  startOfMonth(): this {
    const y = this.year();
    const m = this.month();
    this.date = new Date(Date.UTC(y, m - 1, 1, 0, 0, 0, 0));
    return this;
  }

  endOfMonth(): this {
    const y = this.year();
    const m = this.month();
    this.date = new Date(Date.UTC(y, m, 0, 23, 59, 59, 999));
    return this;
  }

  startOfYear(): this {
    const y = this.year();
    this.date = new Date(Date.UTC(y, 0, 1, 0, 0, 0, 0));
    return this;
  }

  endOfYear(): this {
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
    second,
  }: {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
  }): this {
    // Use current parts if not provided
    const y = year ?? this.year();
    const m = (month ?? this.month()) - 1;
    const d = day ?? this.day();

    // Create a new Date at UTC midnight for given date components
    // Then set time components via setUTCHours etc.
    const newDate = new Date(Date.UTC(y, m, d, 0, 0, 0, 0));

    newDate.setUTCHours(hour ?? 0);
    newDate.setUTCMinutes(minute ?? 0);
    newDate.setUTCSeconds(second ?? 0);
    newDate.setUTCMilliseconds(0);

    this.date = newDate;
    return this;
  }

  format(formatStr: string): string {
    const pad = (n: number, z = 2) => n.toString().padStart(z, "0");

    const replacements: Record<string, string> = {
      YYYY: this.year().toString(),
      MM: pad(this.month()),
      DD: pad(this.day()),
      HH: pad(this.hour()),
      mm: pad(this.minute()),
      ss: pad(this.second()),
    };

    return formatStr.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => replacements[match] || match);
  }

  diffIn(other: DateTimeBuddy, unit: 'seconds' | 'minutes' | 'hours' | 'days' = 'seconds'): number {
  const diffMs = this.date.getTime() - other.date.getTime();
  const map = {
    seconds: 1000,
    minutes: 1000 * 60,
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
  };
  return Math.floor(diffMs / map[unit]);
}


  toDate(): Date {
    return new Date(this.date.getTime());
  }

  toISOString(): string {
    return this.date.toISOString();
  }

  toUnixTimestamp(): number {
    return Math.floor(this.date.getTime() / 1000);
  }

  clone(): DateTimeBuddy {
    return new DateTimeBuddy(this.date, this.timeZone);
  }

  applyOffset(offsetHours: number): DateTimeBuddy {
    const ms = offsetHours * 60 * 60 * 1000;
    this.date = new Date(this.date.getTime() + ms);
    return this;
  }

    getWeekday(): string {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: this.timeZone,
      weekday: 'long',
    }).format(this.date);
  }

  getDayOfWeek(): number {
    // Sunday = 0, Monday = 1, ... Saturday = 6 (UTC-based)
    const dtf = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      timeZone: this.timeZone,
    });
    const part = dtf.formatToParts(this.date).find(p => p.type === 'weekday');
    return this.date.getUTCDay(); // still useful for logic
  }

  getISOWeekday(): number {
    const day = this.date.getUTCDay();
    return day === 0 ? 7 : day; // Monday = 1, Sunday = 7
  }

  getWeekNumber(): number {
    const tempDate = new Date(this.date.getTime());
    tempDate.setUTCHours(0, 0, 0, 0);
    tempDate.setUTCDate(tempDate.getUTCDate() + 4 - (tempDate.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((tempDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  }

  isLeapYear(): boolean {
    const y = this.year();
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  }

  toUTCString(): string {
  return this.date.toUTCString();
}

  toJSON(): string {
    return this.toISOString();
  }

  toLocaleString(locale = 'en-US', options?: Intl.DateTimeFormatOptions): string {
  return this.date.toLocaleString(locale, { timeZone: this.timeZone, ...options });
  }

  toLocaleDateString(locale = 'en-US', options?: Intl.DateTimeFormatOptions): string {
  return this.date.toLocaleDateString(locale, { timeZone: this.timeZone, ...options });
}

  compare(other: DateTimeBuddy): number {
  const diff = this.date.getTime() - other.date.getTime();
  return diff === 0 ? 0 : diff > 0 ? 1 : -1;
}



  daysInMonth(): number {
    const y = this.year();
    const m = this.month();
    return new Date(Date.UTC(y, m, 0)).getUTCDate();
  }

  isWeekend(): boolean {
    const day = this.getDayOfWeek();
    return day === 0 || day === 6;
  }

  equalsDateOnly(other: DateTimeBuddy): boolean {
    return this.year() === other.year() &&
           this.month() === other.month() &&
           this.day() === other.day();
  }

  fromNow(): string {
  const now = new DateTimeBuddy(new Date(), this.timeZone);
  const seconds = Math.floor((this.date.getTime() - now.date.getTime()) / 1000);

  if (Math.abs(seconds) < 10) return 'just now';

  const future = seconds > 0;
  const abs = Math.abs(seconds);

  const units: [string, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
  ];

  for (const [unit, value] of units) {
    const amount = Math.floor(abs / value);
    if (amount >= 1) {
      return future
        ? `in ${amount} ${unit}${amount > 1 ? 's' : ''}`
        : `${amount} ${unit}${amount > 1 ? 's' : ''} ago`;
    }
  }

  return future ? 'in a moment' : 'just now';
}

timeAgo(): string {
  const now = new DateTimeBuddy(new Date(), this.timeZone);
  const seconds = Math.floor((now.date.getTime() - this.date.getTime()) / 1000);

  if (Math.abs(seconds) < 10) return 'just now';

  const units: [string, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
  ];

  for (const [unit, value] of units) {
    const amount = Math.floor(seconds / value);
    if (amount >= 1) {
      return `${amount} ${unit}${amount > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

  formatFriendly(locale = 'en-US', options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(locale, {
      timeZone: this.timeZone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      ...options
    }).format(this.date);
  }

  isToday(): boolean {
  const today = new DateTimeBuddy(new Date(), this.timeZone);
  return this.equalsDateOnly(today);
}

  isTomorrow(): boolean {
  const tomorrow = new DateTimeBuddy(new Date(), this.timeZone).addDays(1);
  return this.equalsDateOnly(tomorrow);
}

  isYesterday(): boolean {
  const yesterday = new DateTimeBuddy(new Date(), this.timeZone).subtractDays(1);
  return this.equalsDateOnly(yesterday);
}
}
