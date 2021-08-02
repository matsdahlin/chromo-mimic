import { HSLColor } from './core';

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
