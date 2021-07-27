import { HSLColor, Filters } from './cm-core';
import { convertRGBtoHSL } from './helpers';

type Bin = {
  min: number;
  max: number;
  count: number;
  values: HSLColor;
};

function binComparer(a: Bin, b: Bin): -1 | 1 | 0 {
  if (a.count > b.count) {
    return -1;
  }
  if (a.count < b.count) {
    return 1;
  }
  return 0;
}

export function setupBins(maxValue = 360, binCount = 6): Bin[] {
  const bins: Bin[] = [];
  const step = maxValue / binCount;
  for (let i = 0; i < maxValue; i += step) {
    const item: Bin = {
      min: i,
      max: i + step,
      count: 0,
      values: { h: 0, s: 0, l: 0 },
    };

    bins.push(item);
  }
  return bins;
}

export function binning(pixels: ImageData, filters: Filters): Bin | null {
  const bins = setupBins();
  const filledBins = fillBins(bins, pixels, filters);
  const sortedBins = filledBins.sort(binComparer);
  const binWinner = sortedBins.shift();

  return binWinner || null;
}

function fillBins(bins: Bin[], pixels: ImageData, filters: Filters) {
  const binsCopy = [...bins];

  for (let i = 0; i < pixels.data.length; i = i + 4) {
    const red = pixels.data[i];
    const green = pixels.data[i + 1];
    const blue = pixels.data[i + 2];
    // const alpha = pixels.data[i + 3];
    const pixelAsHSL = convertRGBtoHSL(red, green, blue);

    for (let j = 0; j < binsCopy.length; j++) {
      let currentBin = binsCopy[j];

      const matchesCurrentBin = pixelAsHSL.h > currentBin.min && pixelAsHSL.h < currentBin.max;
      const isFiltered =
        pixelAsHSL.s > filters.saturationMin &&
        pixelAsHSL.s < filters.saturationMax &&
        pixelAsHSL.l > filters.luminosityMin &&
        pixelAsHSL.l < filters.luminosityMax;

      if (matchesCurrentBin && isFiltered) {
        currentBin.count++;
        currentBin.values.h += pixelAsHSL.h;
        currentBin.values.s += pixelAsHSL.s;
        currentBin.values.l += pixelAsHSL.l;
        break;
      }
    }
  }

  return binsCopy;
}
