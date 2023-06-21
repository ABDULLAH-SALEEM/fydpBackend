const moment = require("moment");

function getTimezoneOffset(spawnTime) {
  const date = new Date();
  const roundBy = 30;
  const currentHours =
    date.getHours() + (Math.round(date.getMinutes() / roundBy) * roundBy) / 60;
  const spawnHours = spawnTime.hours + spawnTime.minutes / 60;
  const timezoneOffset = spawnHours - currentHours;
  console.log(`checking for timezone ${timezoneOffset} against`, spawnTime);
  return timezoneOffset;
}

function generateYesterday(timezoneOffset) {
  const date = moment();
  date.subtract(1, "day");
  date.set({ hours: 0, minutes: 0, second: 0, millisecond: 0 });
  date.subtract(timezoneOffset, "hours");
  return new Date(date);
}
function generateHourMinute(timezoneOffset, { hours, minutes }) {
  const createdAt = moment();
  createdAt.set({ hours, minutes, second: 0, millisecond: 0 })
  createdAt.subtract(timezoneOffset, "hours");
  return new Date(createdAt);
}
function generateDateRange(gap = 1, date = Date.now(), endOffset = 1) {
  const $lt = moment(date);
  $lt.set({ second: 0, millisecond: 0 });
  $lt.add({ day: endOffset });
  const $gte = moment($lt);
  $gte.subtract(gap, "day");
  return { $gte: new Date($gte), $lt: new Date($lt) };
}

module.exports = {
  getTimezoneOffset,
  generateYesterday,
  generateHourMinute,
  generateDateRange,
};
