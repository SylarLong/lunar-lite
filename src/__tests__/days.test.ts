import { getTotalDaysOfLunarMonth, getTotalDaysOfSolarMonth } from '..';

describe('calendar/days', () => {
  test('getTotalDaysOfLunarMonth()', () => {
    try {
      getTotalDaysOfLunarMonth(2000, 13);
    } catch (err) {
      expect((err as Error).message).toBe('invalid month.');
    }

    const data = [
      [0, 1, 0, 0, 1, 0, 1, 1],
      [0, 1, 0, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 0, 1, 0, 1],
      [0, 1, 0, 1, 0, 1, 0, 0],
    ];

    data.forEach((year, yearIndex) => {
      year.forEach((item, monthIndex) => {
        expect(getTotalDaysOfLunarMonth(1900 + yearIndex, monthIndex + 1)).toEqual(item === 0 ? 29 : 30);
      })
    })

    expect(getTotalDaysOfLunarMonth(2023, 6)).toEqual(29);
    expect(getTotalDaysOfLunarMonth(2023, 7)).toEqual(30);
    expect(getTotalDaysOfLunarMonth(1996, 5)).toEqual(30);
  });

  test('getTotalDaysOfSolarMonth()', () => {
    try {
      getTotalDaysOfSolarMonth(2000, 13);
    } catch (err) {
      expect((err as Error).message).toBe('invalid month.');
    }

    expect(getTotalDaysOfSolarMonth(2000, 1)).toEqual(31);
    expect(getTotalDaysOfSolarMonth(2000, 2)).toEqual(29);
    expect(getTotalDaysOfSolarMonth(2000, 4)).toEqual(30);
    expect(getTotalDaysOfSolarMonth(2001, 2)).toEqual(28);
  });
});
