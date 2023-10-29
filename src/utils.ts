import { TERM_INFO } from "./constants";

/**
 * 传入公历年获得该年第termNo个节气的公历节气日
 *
 * @param year 公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
 * @param termNo 节气序号【1～24】
 * @return 节气日期
 * @example
 * termDay = getTerm(1987, 3); // termDay=4; 即1987年2月4日立春
 */
export const getTerm = (year: number, termNo: number) => {
  if (year < 1900 || year > 2100) {
    throw new Error('Year should be greater or equal then 1900.');
  }

  if (termNo < 1 || termNo > 24) {
    throw new Error('termNo should be between 1 and 24.');
  }

  const _table: string = TERM_INFO[year - 1900];
  const _info: string[] = [];

  for (let i = 0; i < 30; i += 5) {
    _info.push(parseInt('0x' + _table.substring(i, i + 5), 16).toString());
  }

  const _calday: string[] = [];

  _info.forEach((item: string) => {
    _calday.push(item.substring(0, 1));
    _calday.push(item.substring(1, 3));
    _calday.push(item.substring(3, 4));
    _calday.push(item.substring(4, 6));
  });

  return parseInt(_calday[termNo - 1], 10);
};

/**
 * 用于处理索引，将索引锁定在 0~max 范围内
 *
 * @param index 当前索引
 * @param max 最大循环数，默认为12【因为12用得最多，宫位数量以及十二地支数量都为12，所以将12作为默认值】
 * @returns {number} 处理后的索引
 */
export const fixIndex = (index: number, max: number = 12): number => {
  if (index < 0) {
    return fixIndex(index + max, max);
  }

  if (index > max - 1) {
    return fixIndex(index - max, max);
  }

  const res = 1 / index === -Infinity ? 0 : index;

  return res;
};
