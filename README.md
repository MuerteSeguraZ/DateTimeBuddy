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

#### Comparison

* `isBefore(other: Date | DateTimeBuddy)`
* `isAfter(other: Date | DateTimeBuddy)`
* `isSame(other: Date | DateTimeBuddy)`
* `daysBetween(other: Date | DateTimeBuddy)`

#### Boundary Helpers (based on timezone)

* `startOfDay()`
* `endOfDay()`
* `startOfMonth()`
* `endOfMonth()`
* `startOfYear()`
* `endOfYear()`

#### Relative Time (New!)

* `fromNow(): string`

  * Returns a future or past expression like `in 3 minutes`, `just now`, or `10 seconds ago`
* `timeAgo(): string`

  * Returns how long ago the instance was from now (e.g., `5 days ago`, `just now`)

#### Utilities

* `setDateComponents({ year?, month?, day?, hour?, minute?, second? })`
* `clone()`
* `toDate()` — returns native `Date` (UTC)
* `toISOString()` — ISO string representation (UTC)
* `toUnixTimestamp()` — seconds since Unix epoch

#### Formatting

```ts
dt.format("YYYY-MM-DD HH:mm:ss");
```

Supported tokens:

* `YYYY` — full year
* `MM` — month (01–12)
* `DD` — day of month (01–31)
* `HH` — hour (00–23, in specified timezone)
* `mm` — minutes (00–59)
* `ss` — seconds (00–59)

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
