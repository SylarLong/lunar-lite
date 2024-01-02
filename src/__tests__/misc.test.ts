import { getSign, getZodiac } from "..";
import { EarthlyBranch } from "../types";
import { fixIndex } from "../utils";

describe("calendar/misc", () => {
  test("fixIndex()", () => {
    expect(fixIndex(-1, 12)).toEqual(11);
    expect(fixIndex(0, 12)).toEqual(0);
    expect(fixIndex(-0, 12)).toEqual(0);
    expect(fixIndex(10, 12)).toEqual(10);
    expect(fixIndex(13, 12)).toEqual(1);
  });

  test("getSign()", () => {
    const data = [
      {
        date: "2023-3-21",
        value: "白羊座",
      },
      {
        date: "2023-4-21",
        value: "金牛座",
      },
      {
        date: "2023-5-22",
        value: "双子座",
      },
      {
        date: "2023-6-22",
        value: "巨蟹座",
      },
      {
        date: "2023-7-23",
        value: "狮子座",
      },
      {
        date: "2023-8-23",
        value: "处女座",
      },
      {
        date: "2023-9-23",
        value: "天秤座",
      },
      {
        date: "2023-10-24",
        value: "天蝎座",
      },
      {
        date: "2023-11-23",
        value: "射手座",
      },
      {
        date: "2023-12-22",
        value: "摩羯座",
      },
      {
        date: "2023-1-20",
        value: "水瓶座",
      },
      {
        date: "2023-2-19",
        value: "双鱼座",
      },
    ];

    data.forEach((item) => {
      expect(getSign(item.date)).toEqual(item.value);
    });
  });

  test("getZodiac()", () => {
    const data = [
      { key: "子", value: "鼠" },
      { key: "丑", value: "牛" },
      { key: "寅", value: "虎" },
      { key: "卯", value: "兔" },
      { key: "辰", value: "龙" },
      { key: "巳", value: "蛇" },
      { key: "午", value: "马" },
      { key: "未", value: "羊" },
      { key: "申", value: "猴" },
      { key: "酉", value: "鸡" },
      { key: "戌", value: "狗" },
      { key: "亥", value: "猪" },
    ];

    data.forEach((item) => {
      expect(getZodiac(item.key as EarthlyBranch)).toEqual(item.value);
    });
  });
});
