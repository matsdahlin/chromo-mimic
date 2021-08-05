import { convertRGBtoHSL } from '../src/helpers';

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
    [
      { r: 122, g: 200, b: 12 },
      { h: 85, s: 88.7, l: 41.6 },
    ],
    [
      { r: 34, g: 30, b: 32 },
      { h: 330, s: 6.3, l: 12.5 },
    ],
  ])('should correctly convert RGB %o \tto HSL %o', (rgbInput, expectedHSL) => {
    const result = convertRGBtoHSL(rgbInput.r, rgbInput.g, rgbInput.b);

    expect(result).toEqual(expectedHSL);
  });
});
