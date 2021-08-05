import { setupBins } from '../src/binning';

describe('setupBins function', () => {
  test.each([1, 5, 10, 15, 100])(
    'should return array of same length as binCount parameter (%s)',
    (binCountValue) => {
      const result = setupBins(360, binCountValue);

      expect(result).toHaveLength(binCountValue);
    }
  );

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
