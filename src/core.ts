/*                                                                                            
 ,-----.,--.                                           ,--.   ,--.,--.          ,--.       
'  .--./|  ,---. ,--.--. ,---. ,--,--,--. ,---. ,-----.|   `.'   |`--',--,--,--.`--' ,---. 
|  |    |  .-.  ||  .--'| .-. ||        || .-. |'-----'|  |'.'|  |,--.|        |,--.| .--' 
'  '--'\|  | |  ||  |   ' '-' '|  |  |  |' '-' '       |  |   |  ||  ||  |  |  ||  |\ `--. 
 `-----'`--' `--'`--'    `---' `--`--`--' `---'        `--'   `--'`--'`--`--`--'`--' `---' 
*/

import { binning } from './binning';

export type HSLColor = {
  h: number;
  s: number;
  l: number;
};

export type Filters = {
  saturationMin: number;
  saturationMax: number;
  luminosityMin: number;
  luminosityMax: number;
};

export type Config = {
  filters: Filters;
  fallbackColor: HSLColor;
};

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

export const defaultConfig: Config = {
  filters: {
    saturationMin: 0,
    saturationMax: 0,
    luminosityMin: 0,
    luminosityMax: 0,
  },
  fallbackColor: { h: 0, s: 0, l: 30 },
};

export async function getColorFromImageData(pixels: ImageData, config: Config = defaultConfig) {
  if (pixels === null) {
    return config.fallbackColor;
  }

  const binWinner = binning(pixels, config.filters);

  if (binWinner === null) {
    console.error('could not get bin winner');
    return { h: 0, s: 0, l: 0 };
  }

  const highestColor = {
    h: Math.floor(binWinner.values.h / binWinner.count),
    s: Math.floor(binWinner.values.s / binWinner.count),
    l: (Math.floor(binWinner.values.l / binWinner.count) * 0.95).toFixed(0),
  };

  if (isNaN(highestColor.h)) {
    return config.fallbackColor;
  }

  return highestColor;
}

export async function getColorFromImage(
  imageUrl: string,
  config: Config = defaultConfig
): Promise<HSLColor> {
  const pixels = await getImagePixels(imageUrl);

  if (pixels === null) {
    return config.fallbackColor;
  }

  const binWinner = binning(pixels, config.filters);

  if (binWinner === null) {
    console.error('could not get bin winner');
    return { h: 0, s: 0, l: 0 };
  }

  const highestColor = {
    h: Math.floor(binWinner.values.h / binWinner.count),
    s: Math.floor(binWinner.values.s / binWinner.count),
    l: Math.floor((binWinner.values.l / binWinner.count) * 0.95),
  };

  if (isNaN(highestColor.h)) {
    return config.fallbackColor;
  }

  return highestColor;
}
