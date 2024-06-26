import { lunar2solar, normalizeDateStr, solar2lunar } from "..";

describe("calendar/convertor", () => {
  test("solar2lunar()", () => {
    const dates = {
      "2023-7-29": {
        date: "二〇二三年六月十二",
        date2: "2023-6-12",
        isLeap: false,
      },
      "2023-4-1": {
        date: "二〇二三年闰二月十一",
        date2: "2023-2-11",
        isLeap: true,
      },
      "2023-4-20": {
        date: "二〇二三年三月初一",
        date2: "2023-3-1",
        isLeap: false,
      },
      "2023-3-21": {
        date: "二〇二三年二月三十",
        date2: "2023-2-30",
        isLeap: false,
      },
      "2023-1-22": {
        date: "二〇二三年正月初一",
        date2: "2023-1-1",
        isLeap: false,
      },
      "2023-1-21": {
        date: "二〇二二年腊月三十",
        date2: "2022-12-30",
        isLeap: false,
      },
      "1900-03-01": {
        date: "一九〇〇年二月初一",
        date2: "1900-2-1",
        isLeap: false,
      },
      "1921-08-01": {
        date: "一九二一年六月廿八",
        date2: "1921-6-28",
        isLeap: false,
      },
      "2020-01-24": {
        date: "二〇一九年腊月三十",
        date2: "2019-12-30",
        isLeap: false,
      },
      "2020-01-25": {
        date: "二〇二〇年正月初一",
        date2: "2020-1-1",
        isLeap: false,
      },
      "1996-07-15": {
        date: "一九九六年五月三十",
        date2: "1996-5-30",
        isLeap: false,
      },
      "1996-07-16": {
        date: "一九九六年六月初一",
        date2: "1996-6-1",
        isLeap: false,
      },
      "1995-03-30": {
        date: "一九九五年二月三十",
        date2: "1995-2-30",
        isLeap: false,
      },
    };

    Object.entries(dates).map(([key, value]) => {
      const result = solar2lunar(key);

      expect(result.toString(true)).toBe(value.date);
      expect(result.toString()).toBe(value.date2);
      expect(result.isLeap).toBe(value.isLeap);
    });

    try {
      solar2lunar("2023-22-22");
    } catch (err) {
      expect((err as Error).message).toBe("wrong month 22");
    }

    try {
      solar2lunar("1988-1-22");
    } catch (err) {
      expect((err as Error).message).toBe(
        "year should be between 1900 and 2100.",
      );
    }

    try {
      solar2lunar("2101-1-22");
    } catch (err) {
      expect((err as Error).message).toBe(
        "year should be between 1900 and 2100.",
      );
    }

    try {
      solar2lunar("1900-1-22");
    } catch (err) {
      expect((err as Error).message).toBe("date must be after 1900-1-31.");
    }
  });

  test("lunar2solar()", () => {
    const dates = {
      "2023-7-29": { date: "2023-6-12", isLeap: false },
      "2023-4-1": { date: "2023-2-11", isLeap: true },
      "2023-4-20": { date: "2023-3-1", isLeap: false },
      "2023-3-21": { date: "2023-2-30", isLeap: false },
      "2023-1-22": { date: "2023-1-1", isLeap: false },
      "2023-1-21": { date: "2022-12-30", isLeap: false },
      "1900-3-1": { date: "1900-2-1", isLeap: false },
      "1921-8-1": { date: "1921-6-28", isLeap: false },
      "2020-1-24": { date: "2019-12-30", isLeap: false },
      "2020-1-25": { date: "2020-1-1", isLeap: false },
      "2023-7-30": { date: "2023-6-13", isLeap: false },
      "1995-3-30": { date: "1995-2-30", isLeap: true },
    };

    Object.entries(dates).map(([key, value]) => {
      expect(lunar2solar(value.date, value.isLeap).toString()).toBe(key);
    });

    try {
      lunar2solar("1988-1-22");
    } catch (err) {
      expect((err as Error).message).toBe("invalid date.");
    }

    try {
      lunar2solar("2101-1-22");
    } catch (err) {
      expect((err as Error).message).toBe("invalid date.");
    }
  });

  test("normalizeDateStr()", () => {
    const data = {
      "2023-12-1": [2023, 12, 1],
      "1998-01-02": [1998, 1, 2],
      "1987-1-08": [1987, 1, 8],
      "2016-08-18": [2016, 8, 18],
      "1986-7-15 12:23:59": [1986, 7, 15, 12, 23, 59],
      "1986.7/15 12:23:59": [1986, 7, 15, 12, 23, 59],
      "1986.07-15 12:23": [1986, 7, 15, 12, 23],
    };

    Object.entries(data).forEach(([key, value]) => {
      expect(normalizeDateStr(key)).toStrictEqual(value);
    });

    expect(normalizeDateStr(new Date(2023, 11, 1))).toStrictEqual([
      2023, 12, 1, 0, 0, 0,
    ]);
    expect(normalizeDateStr(new Date(2023, 11, 1, 12))).toStrictEqual([
      2023, 12, 1, 12, 0, 0,
    ]);
  });
});
