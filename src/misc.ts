import { LunarMonth, Solar } from "lunar-typescript";
import { EARTHLY_BRANCHES, ZODIAC } from "./constants";
import { normalizeDateStr, solar2lunar } from "./convertor";
import { EarthlyBranch } from "./types";

/**
 * 获取星座
 *
 * @param  solarDateStr [description]
 * @return 星座
 */
export const getSign = (solarDateStr: string) => {
  const [year, month, day] = normalizeDateStr(solarDateStr);

  return Solar.fromYmd(year, month, day).getXingZuo() + '座';
};

/**
 * 通过年支获取生肖
 *
 * @param earthlyBranchOfYear 年支
 * @example
 * const zodiac = calendar.getZodiac("卯") ;// zodiac='兔'
 */
export const getZodiac = (earthlyBranchOfYear: EarthlyBranch) => {
  return ZODIAC[EARTHLY_BRANCHES.indexOf(earthlyBranchOfYear)];
};

/**
 * 按照传入阳历日期获取该月农历月份天数
 * 
 * @param solarDateStr 阳历日期
 * @returns {number} 日期天数
 */
export const getTotalDaysOfLunarMonth = (solarDateStr: string) => {
  const {lunarYear, lunarMonth, isLeap} = solar2lunar(solarDateStr);
  const month = LunarMonth.fromYm(lunarYear, isLeap ? 0 - lunarMonth : lunarMonth);

  return month?.getDayCount() ?? 0;
}