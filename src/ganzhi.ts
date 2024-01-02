import { lunar2solar, normalizeDateStr } from "./convertor";
import {
  EarthlyBranch,
  HeavenlyStem,
  HeavenlyStemAndEarthlyBranch,
  HeavenlyStemAndEarthlyBranchDate,
} from "./types";
import { Solar } from "lunar-typescript";

/**
 * 通过农历获取生辰干支
 *
 * @param dateStr 农历日期 YYYY-MM-DD
 * @param timeIndex 时辰索引【0～12】
 * @param isLeap 是否为闰月
 * @returns HeavenlyStemAndEarthlyBranchResult
 */
export const getHeavenlyStemAndEarthlyBranchByLunarDate = (
  dateStr: string,
  timeIndex: number,
  isLeap?: boolean,
): HeavenlyStemAndEarthlyBranchDate => {
  const solarDate = lunar2solar(dateStr, isLeap);

  return getHeavenlyStemAndEarthlyBranchBySolarDate(
    solarDate.toString(),
    timeIndex,
  );
};

/**
 * 将阳历转化为干支纪年
 *
 * @param dateStr 公历日期 YYYY-MM-DD
 * @param timeIndex 时辰索引【0～12】
 * @returns HeavenlyStemAndEarthlyBranchResult
 */
export const getHeavenlyStemAndEarthlyBranchBySolarDate = (
  dateStr: string | Date,
  timeIndex: number,
): HeavenlyStemAndEarthlyBranchDate => {
  const [year, month, date] = normalizeDateStr(dateStr);
  const solar = Solar.fromYmdHms(
    year,
    month,
    date,
    Math.max(timeIndex * 2 - 1, 0),
    30,
    0,
  );
  const lunar = solar.getLunar();
  const yearly: HeavenlyStemAndEarthlyBranch = [
    lunar.getYearGanByLiChun() as HeavenlyStem,
    lunar.getYearZhiByLiChun() as EarthlyBranch,
  ];
  const monthly: HeavenlyStemAndEarthlyBranch = [
    lunar.getMonthGanExact() as HeavenlyStem,
    lunar.getMonthZhiExact() as EarthlyBranch,
  ];
  const daily: HeavenlyStemAndEarthlyBranch = [
    lunar.getDayGanExact() as HeavenlyStem,
    lunar.getDayZhiExact() as EarthlyBranch,
  ];
  const hourly: HeavenlyStemAndEarthlyBranch = [
    lunar.getTimeGan() as HeavenlyStem,
    lunar.getTimeZhi() as EarthlyBranch,
  ];

  return {
    yearly,
    monthly,
    daily,
    hourly,
    toString() {
      return `${yearly.join("")} ${monthly.join("")} ${daily.join(
        "",
      )} ${hourly.join("")}`;
    },
  };
};
