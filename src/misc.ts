import { Solar } from "lunar-typescript";
import { EARTHLY_BRANCHES, ZODIAC } from "./constants";
import { normalizeDateStr } from "./convertor";
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
