const { DateTimeBuddy } = require('datetimebuddy');

const dt = new DateTimeBuddy("2025-07-26T15:04:05Z");

console.log("=== Basic Access & Formatting ===");
console.log("Format (UTC):", dt.format("YYYY-MM-DD HH:mm:ss")); // 2025-07-26 15:04:05
console.log("Year:", dt.year());
console.log("Month:", dt.month());
console.log("Day:", dt.day());
console.log("Hour:", dt.hour());
console.log("Minute:", dt.minute());
console.log("Second:", dt.second());

console.log("\n=== Date Details ===");
console.log("Weekday:", dt.getWeekday());
console.log("ISO Weekday:", dt.getISOWeekday());
console.log("Week Number:", dt.getWeekNumber());
console.log("Is Leap Year:", dt.isLeapYear());
console.log("Days in Month:", dt.daysInMonth());
console.log("Is Weekend:", dt.isWeekend());

console.log("\n=== Date Manipulation ===");
console.log("Add 1 day:", dt.clone().addDays(1).format("YYYY-MM-DD"));
console.log("Subtract 1 hour:", dt.clone().subtractHours(1).format("HH:mm"));
console.log("Start of Day:", dt.clone().startOfDay().format("YYYY-MM-DD HH:mm:ss"));
console.log("End of Month:", dt.clone().endOfMonth().format("YYYY-MM-DD HH:mm:ss"));

console.log("\n=== Comparison & Difference ===");
const other = new DateTimeBuddy("2025-07-30T00:00:00Z");
console.log("Days between:", dt.daysBetween(other));
console.log("Equals date only:", dt.equalsDateOnly(other)); // false
console.log("Compare (should be -1):", dt.compare(other));
console.log("Compare (should be 1):", other.compare(dt));
console.log("Compare (same):", dt.compare(dt.clone()));
console.log("diffIn days:", dt.diffIn(other, "days"));
console.log("diffIn hours:", dt.diffIn(other, "hours"));

console.log("\n=== Conversion ===");
const unix = dt.toUnixTimestamp();
console.log("To Unix timestamp:", unix);
console.log("From Unix timestamp:", DateTimeBuddy.fromUnixTimestamp(unix).toISOString());
console.log("Clone equals original:", dt.clone().isSame(dt));

console.log("\n=== Relative Time ===");
console.log("From now (future):", dt.clone().addMinutes(5).fromNow());
console.log("Time ago (past):", dt.clone().subtractMinutes(5).timeAgo());

console.log("\n=== Timezone Handling ===");
const dtNY = new DateTimeBuddy("2025-07-26T15:04:05Z", "America/New_York");
console.log("Format (America/New_York):", dtNY.format("YYYY-MM-DD HH:mm:ss"));
console.log("Timezone:", dtNY.getTimeZone());

dtNY.setTimeZone("Asia/Tokyo");
console.log("Format after timezone change (Asia/Tokyo):", dtNY.format("YYYY-MM-DD HH:mm:ss"));
console.log("Timezone now:", dtNY.getTimeZone());
console.log("Start of Day (Asia/Tokyo):", dtNY.clone().startOfDay().format("YYYY-MM-DD HH:mm:ss"));
console.log("End of Day (Asia/Tokyo):", dtNY.clone().endOfDay().format("YYYY-MM-DD HH:mm:ss"));

const dtLA = new DateTimeBuddy("2025-07-30T00:00:00Z", "America/Los_Angeles");
console.log("Days between NY and LA instances:", dtNY.daysBetween(dtLA));

console.log("\n=== Output Variants ===");
console.log("toUTCString():", dt.toUTCString());
console.log("toJSON():", dt.toJSON());
console.log("toLocaleString():", dt.toLocaleString());
console.log("toLocaleDateString():", dt.toLocaleDateString());

console.log("\n=== Friendly Formats ===");
console.log("Friendly Format (default):", dt.formatFriendly());
console.log("Friendly Format (ja-JP):", dt.formatFriendly("ja-JP"));
console.log("Friendly Format (fr-FR):", dt.formatFriendly("fr-FR"));

const weekTest = dt.currentWeek();
console.log("Current Week Start:", weekTest.start.format("YYYY-MM-DD HH:mm:ss"));
console.log("Current Week End:", weekTest.end.format("YYYY-MM-DD HH:mm:ss"));

const next = dt.nextWeek();
console.log("Next Week Start:", next.start.format("YYYY-MM-DD"));
console.log("Next Week End:", next.end.format("YYYY-MM-DD"));

const prev = dt.previousWeek();
console.log("Previous Week Start:", prev.start.format("YYYY-MM-DD"));
console.log("Previous Week End:", prev.end.format("YYYY-MM-DD"));

console.log("Add 2 Weeks:", dt.clone().addWeeks(2).format("YYYY-MM-DD"));
console.log("Subtract 1 Week:", dt.clone().subtractWeeks(1).format("YYYY-MM-DD"));
