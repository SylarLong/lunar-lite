<div align="center">

# 📦 lunar-lite

精简版的农历和阳历日期转换库。

</div>

<div align="center">

[![Maintainability](https://api.codeclimate.com/v1/badges/2d004ea6ae3b990b5a41/maintainability)](https://codeclimate.com/github/SylarLong/lunar-lite/maintainability)
[![Codecov](https://github.com/SylarLong/iztro-hook/actions/workflows/Codecov.yml/badge.svg)](https://github.com/SylarLong/lunar-lite/actions/workflows/Codecov.yml)
[![npm](https://img.shields.io/npm/v/lunar-lite?logo=npm&logoColor=%23CB3837)](https://www.npmjs.com/package/lunar-lite) 
![Codecov](https://img.shields.io/codecov/c/github/SylarLong/lunar-lite?logo=codecov&logoColor=%23F01F7A) 
[![npm](https://img.shields.io/npm/dt/lunar-lite?logo=npm&logoColor=%23CB3837)](https://www.npmjs.com/package/lunar-lite) 
[![GitHub](https://img.shields.io/github/license/sylarlong/lunar-lite)](https://www.npmjs.com/package/lunar-lite) 
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SylarLong/lunar-lite)](https://www.npmjs.com/package/lunar-lite) 
[![Package Quality](https://packagequality.com/shield/lunar-lite.svg)](https://packagequality.com/#?package=lunar-lite) 

</div>

---

## 安装

```
npm i lunar-lite -S
```

你也可以用你熟悉的任何包管理软件安装依赖。

## 类型定义

```ts
/**
 * 农历日期对象
 *
 * @property
 * - lunarYear 年
 * - lunarMonth 月
 * - lunarDay 日
 * - isLeap 月份是否闰月
 *
 * @function toString() 输出 YYYY-M-D 或 农历中文 字符串
 */
export type LunarDate = {
  /** 农历年 */
  lunarYear: number;
  /** 农历月 */
  lunarMonth: number;
  /** 农历日 */
  lunarDay: number;
  /** 是否闰月 */
  isLeap: boolean;
  /**
   * 转化为字符串
   *
   * @param toCnStr 是否使用中文字符串, 若该参数为false则字符串中不会携带闰月信息
   * @returns string
   * @example
   * lunarYear = 2023;
   * lunarMonth = 6;
   * lunarDay = 12;
   * isLeap = true;
   *
   * toString(); // 2023-6-12
   * toString(true); // 二〇二三年闰二月十一
   */
  toString: (toCnStr?: boolean) => string;
};

/**
 * 阳历日期对象
 *
 * @property
 * - solarYear 年
 * - solarMonth 月
 * - solarDay 日
 *
 * @function toString() 将对象以 YYYY-M-D 格式字符串输出
 */
export type SolarDate = {
  /** 公历年 */
  solarYear: number;
  /** 公历月 */
  solarMonth: number;
  /** 公历日 */
  solarDay: number;
  /**
   * 转化为字符串
   *
   * @returns string
   * @example
   * solarYear = 2023;
   * solarMonth = 6;
   * solarDay = 12;
   *
   * toString(); // 2023-6-12
   */
  toString: () => string;
};
```

## 方法定义

```ts
/**
 * 公历转农历，年份需要在【1900~2100】之间，并且日期必须在1900-1-31之后
 *
 * @param dateStr 公历日期 YYYY-MM-DD格式的字符串或者Date对象
 * @returns LunarDate
 */
type solar2lunar = (dateStr: string | Date) => LunarDate;

/**
 * 农历转公历
 *
 * @param dateStr 农历日期 YYYY-MM-DD
 * @param isLeapMonth 是否闰月，若该月不是闰月，会忽略该参数
 * @returns SolarDate
 */
type lunar2solar = (dateStr: string, isLeapMonth?: boolean) => SolarDate;
```

## 使用方法

```ts
import {solar2lunar, lunar2solar} from 'lunar-lite';

// 农历转公历
// 当该月不是闰月的时候，第二个参数会被忽略
const solarDate = lunar2solar('1990-10-10', true);

// 公历转农历
const lunarDate = solar2lunar('2023-10-23');
```
