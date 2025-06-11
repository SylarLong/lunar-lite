import { lunar2solar, normalizeDateStr } from "./convertor";
import {
  EarthlyBranch,
  HeavenlyStem,
  HeavenlyStemAndEarthlyBranch,
  HeavenlyStemAndEarthlyBranchDate,
  Options,
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
  options: Options = { year: "normal" },
): HeavenlyStemAndEarthlyBranchDate => {
  const solarDate = lunar2solar(dateStr, isLeap);

  return getHeavenlyStemAndEarthlyBranchBySolarDate(
    solarDate.toString(),
    timeIndex,
    options,
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
  options: Options = { year: "exact" },
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

  const yearlyGan =
    options?.year === "normal"
      ? lunar.getYearGan()
      : lunar.getYearGanByLiChun();
  const yearlyZhi =
    options?.year === "normal"
      ? lunar.getYearZhi()
      : lunar.getYearZhiByLiChun();

  const yearly: HeavenlyStemAndEarthlyBranch = [
    yearlyGan as HeavenlyStem,
    yearlyZhi as EarthlyBranch,
  ];
  const monthly: HeavenlyStemAndEarthlyBranch = [
    lunar.getMonthGan() as HeavenlyStem,
    lunar.getMonthZhi() as EarthlyBranch,
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
