import { convertRGBtoHSL, setupBins } from './chromo-mimic';

describe('rgbToHSL function', () => {
  test.each([
    [
      { r: 0, g: 0, b: 0 },
      { h: 0, s: 0, l: 0 },
    ],
    [
      { r: 255, g: 0, b: 0 },
      { h: 0, s: 100, l: 50 },
    ],
    [
      { r: 132, g: 0, b: 255 },
      { h: 271, s: 100, l: 50 },
    ],
  ])('should correctly convert RGB %o \tto HSL %o', (rgbInput, expectedHSL) => {
    const result = convertRGBtoHSL(rgbInput.r, rgbInput.g, rgbInput.b);

    expect(result).toEqual(expectedHSL);
  });
});

describe('setupBins function', () => {
  test('should return array of same length as binCount parameter', () => {
    const result = setupBins(360, 10);

    expect(result).toHaveLength(10);
  });

  test('should return array where first object is expected shape', () => {
    const result = setupBins(360, 10);
    const expected = {
      min: 0,
      max: 360 / 10,
      count: 0,
      values: { h: 0, s: 0, l: 0 },
    };

    expect(result.shift()).toEqual(expected);
  });

  test('should return array where last object is expected shape', () => {
    const result = setupBins(360, 10);
    const expected = {
      min: 360 - 360 / 10,
      max: 360,
      count: 0,
      values: { h: 0, s: 0, l: 0 },
    };

    expect(result.pop()).toEqual(expected);
  });
});
