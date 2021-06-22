export type HSLColor = {
  h: number;
  s: number;
  l: number;
};

type Bin = {
  min: number;
  max: number;
  count: number;
  values: HSLColor;
};

export type Config = {
  filters: {
    saturation: number;
  };
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

async function getImagePixels(imageUrl: string): Promise<ImageData | null> {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const canvasContext = canvas.getContext('2d');

  if (canvasContext === null) {
    console.error('Could not get context of canvas');
    return null;
  }

  const targetImage = new Image();
  await new Promise((resolve) => {
    targetImage.onload = resolve;
    targetImage.src = imageUrl;
  });

  canvasContext.drawImage(targetImage, 0, 0, canvas.width, canvas.height);

  const pixels = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
  return pixels;
}

export function setupBins(maxValue = 360, binCount = 10): Bin[] {
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

function fillBins(bins: Bin[], pixels: ImageData) {
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

      if (matchesCurrentBin && pixelAsHSL.s > 30 && pixelAsHSL.s < 100 && pixelAsHSL.l < 75) {
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

export async function getColorFromImage(imageUrl: string, config: Config): Promise<HSLColor> {
  const pixels = await getImagePixels(imageUrl);
  if (pixels === null) {
    return { h: 0, s: 0, l: 0 };
  }

  const bins = setupBins();
  const filledBins = fillBins(bins, pixels);
  const sortedBins = filledBins.sort(binComparer);
  const binWinner = sortedBins.shift();

  if (binWinner === undefined) {
    console.error('could not get bin winner');
    return { h: 0, s: 0, l: 0 };
  }

  const highestColor = {
    h: Math.floor(binWinner.values.h / binWinner.count),
    s: Math.floor(binWinner.values.s / binWinner.count),
    l: Math.floor(binWinner.values.l / binWinner.count),
  };

  if (isNaN(highestColor.h) || isNaN(highestColor.s) || isNaN(highestColor.l)) {
    const defaultColor: HSLColor = { h: 0, s: 0, l: 30 };
    return defaultColor;
  }

  return highestColor;
}

export function convertRGBtoHSL(
  redChannel: number,
  greenChannel: number,
  blueChannel: number
): HSLColor {
  // Based on an article by Jon Kantner: https://css-tricks.com/converting-color-spaces-in-javascript/

  // Make r, g, and b fractions of 1
  redChannel /= 255;
  greenChannel /= 255;
  blueChannel /= 255;

  let channelMinValue = Math.min(redChannel, greenChannel, blueChannel),
    channelMaxValue = Math.max(redChannel, greenChannel, blueChannel),
    channelValueDelta = channelMaxValue - channelMinValue,
    hue = 0,
    saturation = 0,
    lightness = 0;

  // Calculate hue

  // No difference
  if (channelValueDelta == 0) hue = 0;
  // Red is max
  else if (channelMaxValue == redChannel)
    hue = ((greenChannel - blueChannel) / channelValueDelta) % 6;
  // Green is max
  else if (channelMaxValue == greenChannel)
    hue = (blueChannel - redChannel) / channelValueDelta + 2;
  // Blue is max
  else hue = (redChannel - greenChannel) / channelValueDelta + 4;

  hue = Math.round(hue * 60);

  // Make negative hues positive behind 360°
  if (hue < 0) hue += 360;

  // Calculate lightness
  lightness = (channelMaxValue + channelMinValue) / 2;

  // Calculate saturation
  saturation = channelValueDelta == 0 ? 0 : channelValueDelta / (1 - Math.abs(2 * lightness - 1));

  // Multiply lightness and saturation by 100
  saturation = +(saturation * 100).toFixed(1);
  lightness = +(lightness * 100).toFixed(1);

  return { h: hue, s: saturation, l: lightness } as HSLColor;
}
