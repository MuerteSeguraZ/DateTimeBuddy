# DateTimeBuddy

A lightweight, UTC-based date/time utility class for JavaScript and TypeScript. Wraps native `Date` with a clean, chainable API for formatting, comparisons, date math, timezone support, and more.

---

## ✨ Features

- Create instances from `Date`, ISO string, number, or Unix timestamp  
- Specify and work with any IANA timezone (e.g., `America/New_York`, `Asia/Tokyo`)  
- Add or subtract days, hours, and minutes  
- Get start/end of day, month, and year in the specified timezone  
- Compare dates (`isBefore`, `isAfter`, `isSame`)  
- Format using tokens: `YYYY`, `MM`, `DD`, `HH`, `mm`, `ss` (all in the chosen timezone)  
- Convert to/from Unix timestamps  
- Clone and safely modify instances  
- Generate human-readable relative times (`fromNow`, `timeAgo`)  
- Fully typed, tree-shakable, and supports both ESM & CommonJS  

---

## 📦 Installation

```bash
npm install datetimebuddy
````

---

## 🚀 Usage

### TypeScript / ESM

```ts
import { DateTimeBuddy } from 'datetimebuddy';

// Specify a timezone on creation (defaults to 'UTC')
const dt = new DateTimeBuddy('2025-07-26T15:04:05Z', 'America/New_York');

console.log(dt.format('YYYY-MM-DD HH:mm:ss')); // Outputs date/time in America/New_York timezone

dt.addDays(3).subtractHours(2);

console.log(dt.toISOString()); // ISO string in UTC (native Date behavior)
```

### CommonJS / JavaScript

```js
const { DateTimeBuddy } = require('datetimebuddy');

const dt = new DateTimeBuddy(new Date(), 'Asia/Tokyo');

console.log(dt.format('YYYY-MM-DD HH:mm:ss')); // Outputs date/time in Asia/Tokyo timezone
```

---

## 🔧 API Reference

### Constructor

```ts
new DateTimeBuddy(date?: Date | string | number, timeZone?: string)
```

Creates a new instance with optional date and timezone.

* `date`: Can be a `Date`, ISO string, number (timestamp), or omitted for current time.
* `timeZone`: IANA timezone string (defaults to `'UTC'`).

---

### Static Methods

| Method                                                                | Description                                                                |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `DateTimeBuddy.now(timeZone?: string)`                                | Returns current date/time instance in specified timezone (default `'UTC'`) |
| `DateTimeBuddy.parse(dateStr: string, timeZone?: string)`             | Parses a date string with timezone support                                 |
| `DateTimeBuddy.fromUnixTimestamp(seconds: number, timeZone?: string)` | Creates from Unix timestamp (seconds) in specified timezone                |

---

### Instance Methods

#### Timezone

* `setTimeZone(tz: string): this` — Change the timezone of the instance
* `getTimeZone(): string` — Get the current timezone string

#### Add / Subtract

* `addDays(days: number)`
* `subtractDays(days: number)`
* `addHours(hours: number)`
* `subtractHours(hours: number)`
* `addMinutes(minutes: number)`
* `subtractMinutes(minutes: number)`

#### Get Date Parts (all respect the instance timezone)

* `year()`
* `month()` — 1 to 12
* `day()`
* `hour()`
* `minute()`
* `second()`
* `getWeekday()` — Returns weekday name (e.g. `'Monday'`)
* `getISOWeekday()` — Returns 1 (Monday) to 7 (Sunday)
* `getWeekNumber()` — ISO week number of the year
* `isLeapYear()` — Checks if year is a leap year
* `daysInMonth()` — Returns number of days in current month
* `isWeekend()` — Returns `true` if Saturday or Sunday

#### Comparison

* `isBefore(other: Date | DateTimeBuddy)`
* `isAfter(other: Date | DateTimeBuddy)`
* `isSame(other: Date | DateTimeBuddy)`
* `compare(other: Date | DateTimeBuddy)` — Returns `-1`, `0`, or `1`
* `equalsDateOnly(other: Date | DateTimeBuddy)` — Compares only year/month/day
* `daysBetween(other: Date | DateTimeBuddy)`
* `diffIn(other: Date | DateTimeBuddy, unit?: 'seconds' | 'minutes' | 'hours' | 'days')` — Returns signed difference

#### Boundary Helpers (based on timezone)

* `startOfDay()`
* `endOfDay()`
* `startOfMonth()`
* `endOfMonth()`
* `startOfYear()`
* `endOfYear()`

#### Relative Time

* `fromNow()` — e.g., `in 3 minutes`, `2 days ago`
* `timeAgo()` — e.g., `5 days ago`, `just now`

#### Utilities

* `setDateComponents({ year?, month?, day?, hour?, minute?, second? })`
* `clone()`
* `toDate()` — returns native `Date` (UTC)
* `toISOString()` — ISO string representation (UTC)
* `toUTCString()` — Returns standard UTC string
* `toJSON()` — Same as `.toISOString()`
* `toLocaleString(locale?: string)` — Locale-aware string (date and time)
* `toLocaleDateString(locale?: string)` — Locale-aware date string only
* `toUnixTimestamp()` — seconds since Unix epoch

#### Formatting

* `format(fmt: string)` — Token-based custom formatting
* `formatFriendly(locale?: string)` — Returns user-friendly string (e.g., `"Saturday, July 26, 2025 at 15:04:05"`)

---

## ✅ Examples

```ts
const dt = DateTimeBuddy.now('Europe/London')
  .startOfDay()
  .addHours(9)
  .addMinutes(30);

console.log(dt.format("YYYY-MM-DD HH:mm")); // e.g., 2025-07-26 09:30 in London time

dt.setTimeZone('America/Los_Angeles');
console.log(dt.format("YYYY-MM-DD HH:mm")); // Same instant in LA timezone

const future = dt.clone().addDays(10);
console.log(dt.daysBetween(future)); // 10

console.log(future.fromNow()); // e.g., "in 10 days"
console.log(dt.timeAgo());     // e.g., "2 minutes ago"
```

---

## 📄 License

MIT © [MuerteSeguraZ](https://github.com/MuerteSeguraZ)

---

```
```
