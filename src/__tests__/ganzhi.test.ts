import {
  getHeavenlyStemAndEarthlyBranchByLunarDate,
  getHeavenlyStemAndEarthlyBranchBySolarDate,
} from "..";

describe("calendar/heavenlyStemAndEarthlyBranch", () => {
  test("getHeavenlyStemAndEarthlyBranchByLunarDate()", () => {
    const data = [
      {
        date: "111-6-13",
        timeIndex: 1,
        isLeap: false,
        result: "辛亥 乙未 庚寅 丁丑",
      },
      {
        date: "1111-6-13",
        timeIndex: 1,
        isLeap: false,
        result: "辛卯 乙未 甲辰 乙丑",
      },
      {
        date: "2023-6-13",
        timeIndex: 1,
        isLeap: false,
        result: "癸卯 己未 己丑 乙丑",
      },
      {
        date: "2023-6-13",
        timeIndex: 12,
        isLeap: false,
        result: "癸卯 己未 庚寅 丙子",
      },
      {
        date: "2023-2-11",
        timeIndex: 1,
        isLeap: true,
        result: "癸卯 乙卯 己丑 乙丑",
      },
      {
        date: "2023-2-11",
        timeIndex: 1,
        isLeap: false,
        result: "癸卯 甲寅 己未 乙丑",
      },
      {
        date: "2023-1-1",
        timeIndex: 1,
        isLeap: false,
        result: "壬寅 癸丑 庚辰 丁丑",
      },
      {
        date: "2022-12-30",
        timeIndex: 1,
        isLeap: false,
        result: "壬寅 癸丑 己卯 乙丑",
      },
      {
        date: "2023-1-29",
        timeIndex: 12,
        isLeap: false,
        result: "癸卯 甲寅 己酉 甲子",
      },
    ];

    data.forEach(({ date, timeIndex, isLeap, result }) => {
      expect(
        getHeavenlyStemAndEarthlyBranchByLunarDate(
          date,
          timeIndex,
          isLeap,
        ).toString(),
      ).toBe(result);
    });
  });

  test("getHeavenlyStemAndEarthlyBranchBySolarDate()", () => {
    const data = [
      {
        date: "2023-1-21",
        timeIndex: 1,
        result: "壬寅 癸丑 己卯 乙丑",
      },
      {
        date: "2023-1-21",
        timeIndex: 12,
        result: "壬寅 癸丑 庚辰 丙子",
      },
      {
        date: "2023-03-09",
        timeIndex: 5,
        result: "癸卯 乙卯 丙寅 癸巳",
      },
      {
        date: "2023-4-8",
        timeIndex: 5,
        result: "癸卯 丙辰 丙申 癸巳",
      },
      {
        date: "2023-1-22",
        timeIndex: 5,
        result: "壬寅 癸丑 庚辰 辛巳",
      },
      {
        date: "2023-2-19",
        timeIndex: 12,
        result: "癸卯 甲寅 己酉 甲子",
      },
      {
        date: "1987-12-6",
        timeIndex: 11,
        result: "丁卯 辛亥 己丑 乙亥",
      },
      {
        date: "1987-12-6",
        timeIndex: 12,
        result: "丁卯 辛亥 庚寅 丙子",
      },
      {
        date: "1983-4-22",
        timeIndex: 0,
        result: "癸亥 丙辰 庚辰 丙子",
      },
    ];

    data.forEach(({ date, timeIndex, result }) => {
      expect(
        getHeavenlyStemAndEarthlyBranchBySolarDate(date, timeIndex).toString(),
      ).toBe(result);
    });
  });
});
