import { LunarDate, SolarDate } from "./types";
import { Lunar, LunarYear, Solar } from "lunar-typescript";

/**
 * 将日期字符串 YYYY-MM-DD 或者一个 Date 对象分割为 [YYYY, M, D, H, m, s]
 * 当参数为字符串时分割符可以是 `-` `.` 或者 `/`
 *
 * @param dateStr 日期字符串或者 Date 对象
 * @returns [年, 月, 日]
 * @example
 * normalizeDateStr('2023-07-31'); // [2023, 7, 31]
 */
export const normalizeDateStr = (date: string | Date) => {
  if (date instanceof Date) {
    return [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];
  }

  return date
    .split(/[ ]+/)
    .map((item) => item.split(/[-:/.]/))
    .reduce((prev, next) => prev.concat(next), [])
    .map((item) => Math.abs(+item));
};

/**
 * 公历转农历，年份需要在【1900~2100】之间，并且日期必须在1900-1-31之后
 *
 * @param dateStr 公历日期 YYYY-MM-DD格式的字符串或者Date对象
 * @returns LunarDate
 */
export const solar2lunar = (dateStr: string | Date): LunarDate => {
  const [year, month, day] = normalizeDateStr(dateStr);

  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();
  const lunarYear = lunar.getYear();
  const lunarMonth = Math.abs(lunar.getMonth());
  const lunarDay = lunar.getDay();
  const isLeap = lunar.getMonth() < 0;

  return {
    lunarYear,
    lunarMonth,
    lunarDay,
    isLeap,
    toString(toCnStr) {
      if (toCnStr) {
        return lunar.toString();
      }

      return `${lunarYear}-${lunarMonth}-${lunarDay}`;
    },
  };
};

/**
 * 农历转公历
 *
 * @param dateStr 农历日期 YYYY-MM-DD
 * @param isLeapMonth 是否闰月，若该月不是闰月，会忽略该参数
 * @returns SolarDate
 */
export const lunar2solar = (
  dateStr: string,
  isLeapMonth?: boolean,
): SolarDate => {
  const [year, month, day] = normalizeDateStr(dateStr);
  let lunar = Lunar.fromYmd(year, month, day);
  const lunarYear = LunarYear.fromYear(lunar.getYear());
  const leapMonth = lunarYear.getLeapMonth();

  if (leapMonth > 0 && isLeapMonth) {
    lunar = Lunar.fromYmd(year, 0 - month, day);
  }

  const solar = lunar.getSolar();

  const solarYear = solar.getYear();
  const solarMonth = solar.getMonth();
  const solarDay = solar.getDay();

  return {
    solarYear,
    solarMonth,
    solarDay,
    toString() {
      return `${solarYear}-${solarMonth}-${solarDay}`;
    },
  };
};
